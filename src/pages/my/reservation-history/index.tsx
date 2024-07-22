import getMyReservationList from '@/apis/get/getMyReservationList';
import Card from '@/components/Card';
import MyReservationCardInfo from '@/components/Card/myReservationCardInfo';
import FilterDropButton from '@/components/FilterButton/FilterDropButton';
import SideNavigation from '@/components/SideNavigation';
import { IReservationCardInfo } from '@/types/ReservationInfo';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function ReservationHistory() {
  const [reservationList, setReservationList] = useState<IReservationCardInfo[]>([]);
  const [cursorId, setCursorId] = useState<number | null>();
  const [isLoading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const handleGetReservationList = useCallback(async () => {
    const result = await getMyReservationList({});

    if (result) {
      setReservationList(result.reservations);
      setCursorId(result.cursorId);
      setLoading(true);
    }
  }, []);

  const getAddReservationList = useCallback(async () => {
    if (!cursorId || !isLoading) return;
    const result = await getMyReservationList({ cursorId, size: 3 });
    if (result) {
      setReservationList((prev) => [...prev, ...result.reservations]);
      setCursorId(result.cursorId);
    }
  }, [cursorId, isLoading]);

  useEffect(() => {
    handleGetReservationList();
  }, [handleGetReservationList]);

  useEffect(() => {
    if (inView) {
      getAddReservationList();
    }
  }, [inView]);

  return (
    <>
      <section className='pt-[14.2rem] pb-[15rem] px-[2rem] max-w-[124rem] mx-auto flex gap-[2.4rem] items-start'>
        <SideNavigation />
        <div className='w-full'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[3.2rem] font-[700] leading-[3.819rem]'>예약 내역</h1>
            <FilterDropButton text='필터' />
          </div>
          <div className='pt-[1.6rem] flex flex-col gap-[2.4rem]'>
            {reservationList &&
              reservationList.map((item) => (
                <Card key={item.id} image={item.activity.bannerImageUrl}>
                  <MyReservationCardInfo data={item} refreshReservationList={handleGetReservationList} />
                </Card>
              ))}
          </div>
        </div>
      </section>
      {isLoading && <div className='h-0 w-full' aria-hidden ref={ref} />}
    </>
  );
}

export default ReservationHistory;
