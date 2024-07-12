// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// import isoWeek from 'dayjs/plugin/isoWeek';
// import 'dayjs/locale/ko';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

// dayjs.extend(isoWeek);
// dayjs.locale('ko');

// interface Event {
//   date: string;
//   title: string;
//   type: string;
// }

// // eslint-disable-next-line react/function-component-definition
// const Calendar: React.FC = () => {
//   const [currentMonth, setCurrentMonth] = useState(dayjs());
//   const [events, setEvents] = useState<Event[]>([
//     { date: '2023-02-09', title: '완료 10', type: 'completed' },
//     { date: '2023-02-10', title: '예약 5', type: 'reservation' },
//     { date: '2023-02-11', title: '예약 2', type: 'reservation' },
//     { date: '2023-02-11', title: '승인 8', type: 'approved' },
//     { date: '2023-02-12', title: '승인 10', type: 'approved' },
//   ]);

//   const startDay = currentMonth.startOf('month').startOf('week');
//   const endDay = currentMonth.endOf('month').endOf('week');

//   const days = [];
//   let day = startDay.clone();

//   while (day.isBefore(endDay, 'day')) {
//     days.push(day.clone());
//     day = day.add(1, 'day');
//   }

//   const prevMonth = () => {
//     setCurrentMonth(currentMonth.subtract(1, 'month'));
//   };

//   const nextMonth = () => {
//     setCurrentMonth(currentMonth.add(1, 'month'));
//   };

//   return (
//     <div className='container mx-auto p-4'>
//       <h1 className='text-2xl font-bold mb-4'>예약 현황</h1>
//       <div className='flex items-center justify-between mb-4'>
//         <h2 className='text-xl font-semibold'>{currentMonth.format('YYYY년 M월')}</h2>
//         <div>
//           <button type='button' onClick={prevMonth}>
//             <ChevronLeftIcon className='w-6 h-6' />
//           </button>
//           <button type='button' onClick={nextMonth}>
//             <ChevronRightIcon className='w-6 h-6' />
//           </button>
//         </div>
//       </div>
//       <div className='grid grid-cols-7 gap-2'>
//         {days.map((day, index) => (
//           <div key={index} className={`p-4 border ${day.isSame(currentMonth, 'month') ? '' : 'bg-gray-100'}`}>
//             <div className='text-center'>
//               <span className={`inline-block w-6 h-6 text-center leading-6 ${day.isSame(dayjs(), 'day') ? 'bg-blue-500 text-white rounded-full' : ''}`}>{day.date()}</span>
//             </div>
//             <div className='text-xs mt-2'>
//               {events
//                 .filter((event) => event.date === day.format('YYYY-MM-DD'))
//                 .map((event, idx) => (
//                   // eslint-disable-next-line no-nested-ternary
//                   <div key={idx} className={`mt-1 ${event.type === 'reservation' ? 'text-blue-500' : event.type === 'completed' ? 'text-gray-500' : 'text-orange-500'}`}>
//                     {event.title}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;
