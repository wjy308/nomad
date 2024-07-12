import Card from '@/components/Card';

import FilterDropButton from '@/components/FilterButton/FilterDropButton';
import SideNavigation from '@/components/SideNavigation';
import { useState } from 'react';

const mockData = [
  {
    image: '/images/test123.png',
    data: { title: '테스트 1', price: 10000, rating: 4.31, reviewCount: 2039, description: '함께 배우면 즐거운 스트릿 댄스 1' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 2', price: 20000, rating: 4.29, reviewCount: 2038, description: '함께 배우면 즐거운 스트릿 댄스 2' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 3', price: 30000, rating: 4.35, reviewCount: 2037, description: '함께 배우면 즐거운 스트릿 댄스 3' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 4', price: 40000, rating: 4.22, reviewCount: 2036, description: '함께 배우면 즐거운 스트릿 댄스 4' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 5', price: 50000, rating: 4.15, reviewCount: 2035, description: '함께 배우면 즐거운 스트릿 댄스 5' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 6', price: 60000, rating: 4.45, reviewCount: 2034, description: '함께 배우면 즐거운 스트릿 댄스 6' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 7', price: 70000, rating: 4.19, reviewCount: 2033, description: '함께 배우면 즐거운 스트릿 댄스 7' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 8', price: 80000, rating: 4.34, reviewCount: 2032, description: '함께 배우면 즐거운 스트릿 댄스 8' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 9', price: 90000, rating: 4.25, reviewCount: 2031, description: '함께 배우면 즐거운 스트릿 댄스 9' },
  },
  {
    image: '/images/test123.png',
    data: { title: '테스트 10', price: 100000, rating: 4.47, reviewCount: 2030, description: '함께 배우면 즐거운 스트릿 댄스 10' },
  },
];

function ReservationHistory() {
  const [reservationList] = useState(mockData);

  return (
    <section className='pt-[14.2rem] pb-[15rem] px-[2rem] max-w-[124rem] mx-auto flex gap-[2.4rem] items-start'>
      <SideNavigation />
      <div className='w-full'>
        <div className='flex justify-between items-center'>
          <h1 className='text-[3.2rem] font-[700] leading-[3.819rem]'>예약 내역</h1>
          <FilterDropButton text='필터' />
        </div>
        <div className='pt-[1.6rem] flex flex-col gap-[2.4rem]'>
          {reservationList.map((item) => (
            <Card key={item.data.title} image={item.image}>
              {/* <MyReservationCardInfo data={{ title: item.data.title, price: item.data.price, rating: item.data.rating, reviewCount: item.data.reviewCount, description: item.data.description }} /> */}
              test
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReservationHistory;
