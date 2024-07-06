// 버튼 디자인 넣어야 함!!!
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
// import BaseButton from '@/components/common/button/BaseButton';
import SmallCalendar from './small-calendar';
import { postformatDate } from '../utils';
import { PostReservationData } from '@/utils/types';
import { GetActivityDetail } from '@/utils/types';

interface DateFormProps {
  control?: Control<PostReservationData, any>;
  onClickCloseModal?: () => void;
  className?: string;
  handleSelectSchedule?: (id: number) => void;
  abledShedule?: GetActivityDetail['schedules'];
}
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateForm({ handleSelectSchedule, control, onClickCloseModal, className, abledShedule }: DateFormProps) {
  const [calenderValue, onChangeCalender] = useState<Value>();
  const [scheduleId, setscheduleId] = useState<number>();
  const abledDate = abledShedule?.map((schedule) => schedule.date);

  const formatDate = postformatDate(calenderValue as Date);

  const handleClickTimes = (id: number) => {
    setscheduleId(id);
    if (handleSelectSchedule) {
      handleSelectSchedule(id);
    }
  };

  const handleChangeValue = (data: Value | string) => {
    onChangeCalender(data as Value);
  };

  return (
    <>
      <h2 className={`text-2xl font-bold text-black leading-10 ${className}`}>날짜</h2>
      <div className={`flex flex-col gap-8 mt-8 max-w-xl ${className}`}>
        <SmallCalendar abledDate={abledDate} value={calenderValue} onChange={handleChangeValue} />
        <div className='w-full'>
          <label htmlFor='abled-time' className='text-lg font-bold text-gray-600 flex items-center'>
            예약 가능한 시간
          </label>
          <ul className='flex flex-wrap gap-3 mt-3'>
            <Controller
              name='scheduleId'
              control={control}
              render={({ field }) => (
                <>
                  {abledShedule?.map((schedule) =>
                    formatDate === schedule.date ? (
                      <li
                        key={schedule.id}
                        value={field.value}
                        className='flex items-center text-base font-medium text-gray-600 gap-4 py-4 px-5 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white'
                      >
                        <button
                          onClick={() => handleClickTimes(schedule.id)}
                          text={`${schedule.startTime}~${schedule.endTime}`}
                          size='sm'
                          variant={scheduleId === schedule.id ? 'primary' : 'outline'}
                        />
                      </li>
                    ) : null,
                  )}
                  {abledShedule?.filter((schedule) => formatDate === schedule.date).length === 0 && (
                    <p className='text-sm font-medium text-green-600 mb-4'>해당하는 날짜에 예약 가능한 시간이 없습니다</p>
                  )}
                </>
              )}
            />
          </ul>
        </div>
        {onClickCloseModal && <button onClick={onClickCloseModal} type='button' text='작성하기' size='lg' />}
      </div>
    </>
  );
}
