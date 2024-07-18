import Dropdown from '@/components/Dropdown';
import getMyActivities from '@/apis/get/getMyActivities';
import { useEffect } from 'react';
import Calendar2 from './calendar';

function Index() {
  const list: { id: number; category: string; title?: string }[] = [];

  useEffect(() => {
    async function getMyAct() {
      try {
        const data = await getMyActivities({ size: 6 });
        // eslint-disable-next-line no-console
        console.log(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('err');
      }
    }
    getMyAct();
  }, []);

  return (
    <div className='flex py-[1.6rem] px-[1.6rem] flex-col'>
      <h1 className='text-[#000] text-[3.2rem] font-[700] mb-[4.2rem]'>예약 현황</h1>
      <Dropdown lists={list} name='카테고리' placeholder='카테고리' onSelectedId={() => {}} />
      <div className='container mx-auto p-4'>
        <Calendar2 />
      </div>
    </div>
  );
}

export default Index;
