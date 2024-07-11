import deleteActivity from '@/apis/delete/deleteActivity';
import getMyActivities from '@/apis/get/getMyActivities';
import AcitivitiesCardList from '@/components/CardList/AcitivitiesCardList';
import MyLayout from '@/components/MyLayout';
import { GETMyActivities } from '@/utils/types/myActivities';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function MyActivities() {
  const [cardsData, setCardsData] = useState<GETMyActivities>({ cursorId: 0, totalCount: 0, activities: [] });

  const getCardsData = useCallback(async () => {
    const data = await getMyActivities({ cursorId: null, size: 20 });
    if (data) {
      setCardsData(data);
    }
  }, []);

  const delActivity = async (activitiyId: number) => {
    const response = await deleteActivity(activitiyId);
    /* 성공시 response는 falsy값 */
    if (!response) {
      const updatedActivities = cardsData.activities.filter((activitiy) => activitiy.id !== activitiyId);
      setCardsData((prev) => ({ ...prev, activities: updatedActivities }));
    } else {
      alert(response);
      // 임시, 실패할 경우 모달을 띄워 알려줄 예정
    }
  };

  useEffect(() => {
    getCardsData();
  }, [getCardsData]);

  return (
    <MyLayout>
      <main className='bg-[#fafafa]'>
        <div className='flex justify-between mb-[2.4rem]'>
          <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem] font-bold'>내 체험 관리</h2>
          <Link href='/myactivities/postactivity' className='flex justify-center items-center w-[12rem] h-[4.8rem] text-[#fff] bg-[#112211] font-bold text-[1.6rem] leading-[2.6rem] rounded-[0.4rem]'>
            체험 등록하기
          </Link>
        </div>
        <AcitivitiesCardList activities={cardsData.activities} delActivity={delActivity} />
      </main>
    </MyLayout>
  );
}
