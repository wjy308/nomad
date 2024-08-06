import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Image from 'next/image';
import { ICON } from '@/constant';
import CustomPopup from '@/components/CustomPopup';
import { Schedule } from '@/utils/types/schedule';
import useReservation from '@/hooks/useReservation';
import usePopup from '@/hooks/usePopup';
import useFormatPrice from '@/hooks/useFormatPrice';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import DarkModeStore from '@/context/themeContext';

/* eslint-disable */
interface MobileCardProps {
  price: number;
  schedules: Schedule[];
  userData: any;
}

function MobileCard({ price, schedules, userData }: MobileCardProps) {
  const formattedPrice = useFormatPrice(price);
  const { selectedDate, selectedTime, participants, handleDateChange, handleParticipantsChange, handleTimeChange, handleReservation, isButtonDisabled, totalCost } = useReservation(schedules, price);
  const redirectToSignIn = useAuthRedirect();
  const [isParticipantsPopupOpen, setIsParticipantsPopupOpen] = useState(false);
  const [selectedTimeText, setSelectedTimeText] = useState<string>('날짜 선택하기');
  const [participantsText, setParticipantsText] = useState<string>('1명');

  const { isPopupOpen, openPopup, closePopup, setPopupPosition } = usePopup(true);
  const { isDarkMode } = DarkModeStore((state) => state);

  useEffect(() => {
    if (participants === 1) {
      setParticipantsText('1명');
    } else {
      setParticipantsText(`총 ${participants}명`);
    }
  }, [participants]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      setSelectedTimeText(`시간 ${selectedTime}`);
    } else {
      setSelectedTimeText('날짜 선택하기');
    }
  }, [selectedDate, selectedTime]);

  const handleOpenPopup = () => {
    openPopup();
    setPopupPosition(null);
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
    <>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full bg-white border-2 border-solid border-gray-50 shadow-md flex flex-row items-center justify-between p-4 z-50 dark:bg-black dark:border-gray-10'>
        <div className='flex flex-col gap-[0.8rem]'>
          <div className='flex flex-row items-center'>
            <p className='text-[2rem] font-bold dark:text-gray-10'>₩ {formattedPrice.toLocaleString()} /</p>
            <p className='text-[1.8rem] text-medium dark:text-gray-10 cursor-pointer underline ml-1 px-[0.6rem]' onClick={() => setIsParticipantsPopupOpen(true)}>
              {participantsText}
            </p>
          </div>
          <p className='text-[1.4rem] text-semibold dark:text-gray-10 cursor-pointer underline' onClick={handleOpenPopup}>
            {selectedTimeText}
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <Button text='예약하기' color='black' cssName='w-[10.6rem] h-[4.8rem] text-[1.6rem] font-bold' onClick={handleReservationClick} disabled={isButtonDisabled} />
        </div>
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-[1000]'>
          <div className='fixed inset-0 bg-black bg-opacity-50 z-[-1]' />
          <div className='relative bg-white rounded-lg shadow-lg p-4 w-full h-full max-w-[90%] max-h-[90%] md:max-w-[48rem] md:max-h-[60rem]'>
            <button type='button' onClick={closePopup} className='absolute top-4 right-4 p-2'>
              <Image src={ICON.close.default.src} alt={ICON.close.default.alt} width={20} height={20} />
            </button>
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
        </div>
      )}

      {isParticipantsPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-[1000]'>
          <div className='fixed inset-0 bg-black bg-opacity-50 z-[-1]' />
          <div className='relative bg-white rounded-lg shadow-lg p-4 w-full h-full md:max-w-[48rem] md:max-h-[60rem] flex flex-col dark:bg-black dark:text-gray-10'>
            <button type='button' onClick={() => setIsParticipantsPopupOpen(false)} className='absolute top-4 right-4 p-2'>
              <Image src={isDarkMode ? ICON.darkClose.default.src : ICON.close.default.src} alt={isDarkMode ? ICON.darkClose.default.alt : ICON.close.default.alt} width={30} height={30} />
            </button>

            <p className='my-[1.6rem] font-bold text-[2.8rem]'>인원</p>
            <div className='flex flex-col gap-[2.4rem]'>
              <p className='text-[2rem] text-[#4b4b4b] mt-[3.2rem] dark:text-gray-10'>예약할 인원을 선택해주세요</p>
              <div className='flex items-center gap-[0.4rem]'>
                <div className='w-[12rem] h-[4rem] flex items-center mt-[0.8rem] mb-[2.4rem] rounded-[0.6rem] border-2 border-gray-50 border-solid dark:border-gray-10 dark:bg-black'>
                  <button type='button' onClick={() => handleParticipantsChange(-1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Decrement participants'>
                    <Image src={ICON.minusInput.default.src} alt={ICON.minusInput.default.alt} width={40} height={40} />
                  </button>
                  <input
                    type='text'
                    value={participants}
                    readOnly
                    className='w-full h-full p-[0.8rem] outline-none text-center text-[1.4rem] caret-transparent dark:bg-black dark:text-gray-10'
                    aria-label='Number of participants'
                  />
                  <button type='button' onClick={() => handleParticipantsChange(1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Increment participants'>
                    <Image src={ICON.plusInput.default.src} alt={ICON.plusInput.default.alt} width={40} height={40} />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-[6.4rem] mb-[3.2rem]'>
              <Button
                text='확인'
                color='black'
                cssName='w-full max-w-[43.2rem] h-[5.6rem] text-[1.6rem] font-bold'
                onClick={() => setIsParticipantsPopupOpen(false)}
                style={{ position: 'absolute', bottom: '4rem' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileCard;

/* eslint-enable */
