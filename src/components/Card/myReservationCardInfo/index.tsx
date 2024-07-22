import patchCancelMyReservation from '@/apis/patch/patchCancelMyReservation';
import Button from '@/components/Button';
import Review from '@/components/Review';
import { IReservationCardInfo } from '@/types/ReservationInfo';
import setReservationStatueInfo from '@/utils/setReservationStatueInfo';
import { useState } from 'react';

export default function MyReservationCardInfo({ data, refreshReservationList }: { data: IReservationCardInfo; refreshReservationList: () => void }) {
  const { activity, status, totalPrice, date, startTime, endTime, headCount } = data;
  const statusInfo = setReservationStatueInfo(status);
  const btnCss = 'w-[12.1rem] h-[4rem] text-[1.4rem]';
  const [reviewModalState, setModalState] = useState(false);

  const handleOpenReview = () => {
    setModalState(true);
  };

  const handleCloseReview = () => {
    setModalState(false);
  };

  const handleCancelReservation = async () => {
    const result = await patchCancelMyReservation(data.id);
    if (result) {
      refreshReservationList();
    }
  };

  return (
    <>
      <div className='relative flex flex-col justify-center w-full'>
        <span className={`leading-[2.6rem] font-[700] text-[1.6rem] ${statusInfo.btnColor}`}>{statusInfo.name}</span>
        <h3 className='text-[2rem] font-[700] leading-[2.6rem] text-[#112211] mt-[0.8rem]'>{activity.title}</h3>
        <span className='text-[1.8rem] font-[400] leading-[2.4rem] pt-[1.2rem]'>
          {date} · {startTime} - {endTime} · {headCount}명
        </span>
        <div className='flex justify-between mt-[1.6rem]'>
          <span className='text-[2.4rem] text-[#1b1b1b] leading-[2.864rem] font-[500]'>₩{totalPrice.toLocaleString('ko-KR')}</span>
          {statusInfo.name === '예약 완료' && <Button text='예약 취소' color='white' cssName={btnCss} onClick={handleCancelReservation} />}
          {statusInfo.name === '체험 완료' && <Button text='후기 작성' color='black' cssName={btnCss} onClick={handleOpenReview} />}
        </div>
      </div>
      {reviewModalState && <Review closeModal={handleCloseReview} reservationInfo={data} />}
    </>
  );
}
