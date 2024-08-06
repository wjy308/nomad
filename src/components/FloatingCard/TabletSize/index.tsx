import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ICON } from '@/constant';
import { Schedule } from '@/utils/types/schedule';
import Button from '@/components/Button';
import CustomPopup from '@/components/CustomPopup';
import useReservation from '@/hooks/useReservation';
import usePopup from '@/hooks/usePopup';
import useFormatPrice from '@/hooks/useFormatPrice';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

/* eslint-disable */
interface TabletCardProps {
  schedules: Schedule[];
  price: number;
  userData: any;
}

function TabletCard({ schedules, price, userData }: TabletCardProps) {
  const formattedPrice = useFormatPrice(price);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { selectedDate, selectedTime, participants, handleDateChange, handleParticipantsChange, handleTimeChange, handleReservation, isButtonDisabled, totalCost } = useReservation(schedules, price);
  const redirectToSignIn = useAuthRedirect();

  const [selectedTimeText, setSelectedTimeText] = useState<string>('날짜 선택하기');
  const { isPopupOpen, openPopup, closePopup, popupStyles, setPopupPosition } = usePopup(false);

  const handlePopupOpen = () => {
    openPopup();
    setPopupPosition(cardRef.current);
  };

  const handlePopupClose = (newTimeText: string | null) => {
    if (newTimeText !== null) {
      setSelectedTimeText(newTimeText);
    }
    closePopup();
  };

  const handleReservationClick = () => {
    if (!userData) {
      redirectToSignIn();
      return;
    }
    handleReservation();
  };

  return (
    <div ref={cardRef} className='sticky top-[8rem] z-10'>
      <div className={`w-full max-w-[38.4rem] h-auto bg-white border-[0.2rem] border-gray-50 rounded-[0.8rem] shadow-lg p-[1rem] mx-auto mt-[8rem] dark:bg-black ${isPopupOpen ? 'opacity-50' : ''}`}>
        <div className='px-[2.4rem]'>
          <div className='flex flex-wrap items-center gap-[0.8rem] mb-[1.6rem]'>
            <p className='text-[2.8rem] font-bold dark:text-gray-10'>₩ {formattedPrice}</p>
            <p className='text-[2rem] dark:text-gray-10'> / 인</p>
          </div>
          <div className='border border-solid border-gray-50 mt-[1.6rem]' />

          <p className='my-[1.6rem] font-bold text-[2rem] dark:text-gray-10'>날짜</p>
          <p className='text-[1.6rem] cursor-pointer underline font-semibold dark:text-gray-10' onClick={handlePopupOpen}>
            {selectedTimeText}
          </p>

          <div className='border border-solid border-gray-50 mt-[1.6rem]' />
          <p className='my-[1.2rem] font-bold text-[2rem] dark:text-gray-10'>참여 인원 수</p>
          <div className='flex items-center gap-[0.4rem]'>
            <div className='w-[12rem] h-[4rem] flex items-center mt-[0.8rem] mb-[2.4rem] rounded-[0.6rem] border-2 border-gray-50 border-solid dark:bg-white'>
              <button type='button' onClick={() => handleParticipantsChange(-1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Decrement participants'>
                <Image src={ICON.minusInput.default.src} alt={ICON.minusInput.default.alt} width={40} height={40} />
              </button>
              <input type='text' value={participants} readOnly className='w-full h-full p-[0.8rem] outline-none text-center text-[1.4rem] caret-transparent' aria-label='Number of participants' />
              <button type='button' onClick={() => handleParticipantsChange(1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Increment participants'>
                <Image src={ICON.plusInput.default.src} alt={ICON.plusInput.default.alt} width={40} height={40} />
              </button>
            </div>
          </div>

          <div className='flex justify-center'>
            <Button text='예약하기' color='black' cssName='w-[33.6rem] h-[4.6rem] text-[1.6rem] text-bold' onClick={handleReservationClick} disabled={isButtonDisabled} />
          </div>
          <div className='border border-solid border-gray-50 mt-[1.6rem]' />
          <div className='flex flex-wrap justify-between my-[1.8rem]'>
            <p className='text-[2rem] font-bold dark:text-gray-10'>총 합계</p>
            <p className='text-[2rem] font-bold dark:text-gray-10'>₩ {useFormatPrice(totalCost)}</p>
          </div>
        </div>
      </div>
      {isPopupOpen && cardRef.current && (
        <div style={popupStyles}>
          <CustomPopup
            schedules={schedules}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onClose={() => handlePopupClose(null)}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            setSelectedTimeText={(text) => handlePopupClose(text)}
          />
        </div>
      )}
    </div>
  );
}

export default TabletCard;

/* eslint-enable */
