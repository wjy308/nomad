import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import { DateInput, Input, Textarea } from '@/components/Input';
import MyLayout from '@/components/MyLayout';
import { POSTActivitiesReq } from '@/utils/types/myActivities';
import { FormEvent, useState } from 'react';

// 문화 예술 | 식음료 | 스포츠 | 투어 | 관광 | 웰빙
export default function PostActivitiy() {
  const [postData, setPostData] = useState<POSTActivitiesReq>({
    title: '',
    category: '',
    description: '',
    address: '',
    price: 10000,
    schedules: [],
    bannerImageUrl: '',
    subImageUrls: [],
  });

  const category = [
    { id: -10000, category: '문화 예술' },
    { id: -20000, category: '식음료' },
    { id: -30000, category: '스포츠' },
    { id: -40000, category: '투어' },
    { id: -50000, category: '관광' },
    { id: -60000, category: '웰빙' },
  ];

  const DATE_LABEL_STYLE = 'text-[2rem] leading-[2.6rem] text-[#4b4b4b] max-md:text-[1.6rem]';
  const DATE_INPUT_LABEL_STYLE = 'flex flex-col gap-y-[1rem] max-md:gap-y-[0.8rem]';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <MyLayout>
      <main className='bg-[#fafafa]'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between mb-[2.4rem] '>
            <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem] font-bold'>내 체험 등록</h2>
            <Button type='submit' color='black' cssName='w-[12rem] h-[4.8rem] text-[1.6rem] leading-[2.6rem] rounded-[0.4rem] border-none' text='등록하기' />
          </div>
          <div className='flex flex-col gap-y-[2.4rem]'>
            {/* ------제목------ */}
            <Input placeholder='제목' type='text' />
            {/* ------카테고리------ */}
            <Dropdown lists={category} name='카테고리' placeholder='카테고리' onSelectedId={() => {}} />
            {/* ------설명------ */}
            <Textarea placeholder='설명' />
            {/* ------가격------ */}
            <div className='flex flex-col gap-y-[1.6rem]'>
              <label htmlFor='price' className='text-[#1b1b1b] text-[2.4rem] font-bold leading-[2.6rem] max-md:text-[2rem]'>
                가격
              </label>
              <Input placeholder='가격' type='number' id='price' />
            </div>
            {/* -----주소----- */}
            <div className='flex flex-col gap-y-[1.6rem]'>
              <label htmlFor='address' className='text-[#1b1b1b] text-[2.4rem] font-bold leading-[2.6rem] max-md:text-[2rem]'>
                주소
              </label>
              <Input placeholder='주소' type='text' id='address' />
            </div>
            {/* ------예약 가능한 시간대------ */}
            <div className='flex flex-col gap-y-[2.4rem]'>
              <span className='text-[#1b1b1b] max-md:hidden text-[2.4rem] font-bold leading-[2.6rem] max-md:text-[2rem]'>예약 가능한 시간대</span>
              <div className='flex flex-col gap-y-[2.1rem] max-lg:gap-y-[1.6rem]'>
                <div className='flex pb-[2.1rem] border-b border-[#DDD] max-lg:pb-[1.6rem]'>
                  <div className={DATE_INPUT_LABEL_STYLE}>
                    <label htmlFor='date' className={DATE_LABEL_STYLE}>
                      날짜
                    </label>
                    <DateInput name='날짜' id='date' onPostDataValue={() => {}} />
                  </div>
                  <div className={DATE_INPUT_LABEL_STYLE}>
                    <label htmlFor='startTime' className={DATE_LABEL_STYLE}>
                      시작 시간
                    </label>
                    <Input type='time' id='startTime' />
                  </div>
                  <div className={DATE_INPUT_LABEL_STYLE}>
                    <label htmlFor='endTime' className={DATE_LABEL_STYLE}>
                      종료 시간
                    </label>
                    <Input type='time' id='endTime' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </MyLayout>
  );
}
