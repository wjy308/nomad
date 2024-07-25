/* eslint-disable */
import { useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useCustomInfiniteQuery from '@/hooks/useCustomInfiniteQuery';
import { getMyActivitiesReservation, getReservedScheduleDate } from '@/apis/get/getAvailableReservations';
import { ReservationCardType } from '@/utils/types/reservationInfo';
import { queryKey } from '@/apis/queryKey';
import PropTypes from 'prop-types';
import ReservationCard from './ReservationCard';
import ActivityDropDown, { ActivityType } from '@/pages/reservationdashboard/ActivityDropDown';

interface ReservationSchedule {
  count: { pending: number; confirmed: number; declined: number };
  endTime: string;
  scheduleId: number;
  startTime: string;
}

interface Props {
  date: string;
  activityId: number;
}

const STATUSES = ['신청', '확정', '거절'];

export default function ReservationInfo({ date, activityId }: Props) {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ReservationCardType['status']>('pending');
  const [scheduledId, setScheduledId] = useState<number>(0);
  const [schedule, setSchedule] = useState(); // eslint-disable-line @typescript-eslint/no-shadow
  const observerRef = useRef<HTMLDivElement>(null);
  const [filteredDropdownList, setFilteredDropdownList] = useState<{ id: number; title: string }[]>([]); // 필터링된 드롭박스 리스트 상태 추가

  const { data: reservedScheduleData } = useQuery({
    queryKey: queryKey.getMyReservationUseDate(date),
    queryFn: () => getReservedScheduleDate(activityId, date),
  });

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: reservationStatusData,
  } = useCustomInfiniteQuery({
    queryKey: queryKey.getMyReservationsUseTime(scheduledId, selectedStatus), // eslint-disable-line @tanstack/query/exhaustive-deps
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => getMyActivitiesReservation(activityId, scheduledId, selectedStatus, 10, { pageParam }),
  });

  useIntersectionObserver({
    observerRef,
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  const dropdownList = reservedScheduleData?.map((reservation: ReservationSchedule) => ({
    id: reservation.scheduleId,
    title: `${reservation.startTime} ~ ${reservation.endTime}`,
  })) ?? [{ id: scheduledId }];

  const cardList = reservationStatusData?.pages ?? [];

  useEffect(() => {
    // 탭 이동 시 드롭박스 리스트 갱신
    const newFilteredDropdownList =
      reservedScheduleData
        ?.filter((reservation: ReservationSchedule) => reservation.count[selectedStatus] > 0)
        .map((reservation: ReservationSchedule) => ({
          id: reservation.scheduleId,
          title: `${reservation.startTime} ~ ${reservation.endTime}`,
        })) ?? [];
    setFilteredDropdownList(newFilteredDropdownList);
    if (newFilteredDropdownList.length > 0) {
      setScheduledId(newFilteredDropdownList[0].id); // 첫 번째 요소를 기본 선택 상태로 설정
    }
  }, [reservedScheduleData, selectedStatus]);

  const handleActivitySelected = (selectedItem: ActivityType) => {
    setScheduledId(selectedItem.id);
    queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(scheduledId, selectedStatus) });
  };

  const handleSelect = (status: string) => {
    const newSelectedStatus = status === '신청' ? 'pending' : status === '확정' ? 'confirmed' : 'declined';
    setSelectedStatus(newSelectedStatus);

    // 필터링된 드롭박스 리스트 갱신 및 기본 선택 상태 설정
    const newFilteredDropdownList =
      reservedScheduleData
        ?.filter((reservation: ReservationSchedule) => reservation.count[newSelectedStatus] > 0)
        .map((reservation: ReservationSchedule) => ({
          id: reservation.scheduleId,
          title: `${reservation.startTime} ~ ${reservation.endTime}`,
        })) ?? [];

    setFilteredDropdownList(newFilteredDropdownList);
    if (newFilteredDropdownList.length > 0) {
      setScheduledId(newFilteredDropdownList[0].id);
    }

    queryClient.invalidateQueries({ queryKey: queryKey.getMyReservationsUseTime(scheduledId, newSelectedStatus) });
  };

  return (
    <>
      <h1 className='text-[2.8rem] font-bold text-black leading-[2.6rem] mt-4 mb-[-1rem]'>예약 정보</h1>
      <ul className='flex items-start text-[2rem] font-normal text-gray-600 gap-[1.2rem] mt-[3.4rem] leading-[2.6rem] border-b border-gray-300'>
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => handleSelect(status)}
            className={`mb-[-0.2rem] py-0 px-[0.4rem] pb-[1.3rem] ${
              selectedStatus === (status === '신청' ? 'pending' : status === '확정' ? 'confirmed' : 'declined') ? 'font-semibold text-darkgreen border-b-4 border-darkgreen' : ''
            }`}
            type='button' // eslint-disable-line react/button-has-type
          >
            {status} {schedule?.[status === '신청' ? 'pending' : status === '확정' ? 'confirmed' : 'declined']}
          </button>
        ))}
      </ul>
      <article className='flex flex-col items-start pt-[2.5rem] mb-[6rem] gap-[3.2rem] w-full overflow-scroll'>
        <div className='w-full'>
          <h3 className='text-[2rem] font-semibold text-black mb-[0.4rem]'>예약 날짜</h3>
          <p className='text-[2rem] font-normal text-black mb-[1rem]'>{date}</p>
          {filteredDropdownList.length > 0 && ( // 수정된 부분
            <ActivityDropDown
              items={filteredDropdownList}
              onItemSelected={handleActivitySelected}
              labelText='시간대 선택' // 추가된 부분
            />
          )}
        </div>
        <div className='overflow-auto w-full'>
          <h3 className='text-[2rem] font-semibold text-black mb-[0.4rem]'>예약 내역</h3>
          <ul className='flex flex-col items-start gap-[1.4rem] mt-[1.6rem] w-full max-h-[25rem] min-h-[17.5rem]'>
            {cardList?.length !== 0 ? (
              cardList?.map((reservation: ReservationCardType) => (
                <ReservationCard
                  key={reservation.id}
                  nickname={reservation.nickname}
                  headCount={reservation.headCount}
                  reservationId={reservation.id}
                  selectedStatus={selectedStatus}
                  status={reservation.status}
                  activityId={reservation.activityId}
                  date={date} // 추가
                  scheduledId={scheduledId} // 추가
                  // onStatusChange={onStatusChange}
                  // onClickCloseModal={onClickCloseModal}
                />
              ))
            ) : (
              <li className='flex flex-col justify-between items-stretch border rounded-md border-gray-300 p-[1.6rem] w-[38.2rem] h-[11.6rem] text-[1.8rem] font-medium text-gray-600'>
                예약 내역이 없습니다
              </li>
            )}
          </ul>
        </div>
      </article>
      {/* {reservedScheduleData?.length !== 0 && (
        <div className='flex items-center justify-between fixed w-[88%] bottom-[2rem] p-[1rem] pb-0 bg-white'>
          <h2 className='text-[2.8rem] font-semibold text-black'>예약 현황</h2>
          <h2 className='text-[2.8rem] font-semibold text-black'>{reservedScheduleData?.length}</h2>
        </div>
      )} */}
    </>
  );
}

// eslint-disable-next-line react/require-default-props
// ReservationInfo.defaultProps = {
//   date: '2024-03-20',
//   activityId: 178,
//   onClickCloseModal: () => {},
// };

ReservationInfo.propTypes = {
  date: PropTypes.string,
  activityId: PropTypes.number,
  onClickCloseModal: PropTypes.func,
};
/* eslint-enable */
