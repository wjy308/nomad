import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes, InputHTMLAttributes, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import useToggleButton from '@/hooks/useToggleButton';
import { USER_PASSWORD_SHOW, ICON } from '@/constant';
import useOutsideClick from '@/hooks/useOutsideClick';
import SmallCalendar from '../Modal/ModalContents/dateform/small-calendar';
import { Value } from '../Modal/ModalContents/dateform/DateForm';
import { postformatDate, displayDateFormat } from '../Modal/ModalContents/utils';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'number' | 'time';
  isError?: boolean;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ type, isError, errorMessage, ...props }, ref) {
  const { isToggle, handleToggleClick } = useToggleButton();
  const { src, alt, inputType } = isToggle ? USER_PASSWORD_SHOW.on : USER_PASSWORD_SHOW.off;

  return (
    <>
      <div className='relative w-full'>
        <input
          {...props}
          ref={ref}
          type={type === 'password' ? inputType : type}
          className={`w-full p-4 rounded-md border transition ${
            isError ? 'border-red-500' : 'border-gray-400 focus:border-darkgreen'
          } ${type === 'number' ? 'appearance-none' : ''} ${type === 'time' ? 'md:p-4 md:px-2' : ''}`}
          placeholder={props.placeholder}
        />
        {type === 'password' && (
          <button type='button' onClick={handleToggleClick} className='flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 right-4'>
            <Image src={src} alt={alt} width={24} height={24} />
          </button>
        )}
      </div>
      {isError && <p className='text-red-500 text-sm pl-2'>{errorMessage}</p>}
    </>
  );
});

const { calendar } = ICON;

interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onPostDataValue: (value: string) => void;
  name: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput({ name, onPostDataValue, ...props }, ref) {
  const [calenderValue, onChangeCalender] = useState<Value>();

  const { isToggle, handleToggleClick } = useToggleButton();
  const [selectedDate, setSelectedDate] = useState('');
  const outsideRef = useRef(null);

  useOutsideClick(outsideRef, isToggle, handleToggleClick);

  const nextShowValue = useMemo(() => calenderValue && displayDateFormat(calenderValue as Date), [calenderValue]);
  const nextPostValue = useMemo(() => calenderValue && postformatDate(calenderValue as Date), [calenderValue]);
  useMemo(() => {
    if (!nextShowValue) return;

    setSelectedDate(nextShowValue);
    onPostDataValue(nextPostValue as string);
  }, [calenderValue]);

  const handleDateSelected = (data: string | Value) => {
    onChangeCalender(data as Value);
    setSelectedDate(data as string);
    handleToggleClick();
  };

  return (
    <>
      <div className='relative w-full'>
        <button className='inline-flex items-center w-full relative z-10 p-3.5 bg-white border border-gray-400 rounded-md' type='button' onClick={handleToggleClick}>
          <input
            {...props}
            className='w-full text-base font-normal text-black bg-white border-none focus:outline-none'
            name={name}
            type='text'
            value={selectedDate ? selectedDate : ''}
            readOnly
            placeholder='YY/MM/DD'
            ref={ref}
          />
          <div className='absolute top-1/2 transform -translate-y-1/2 right-2.5'>
            <Image src={calendar.default.src} alt={calendar.default.alt} width={28} height={28} />
          </div>
        </button>

        {isToggle && (
          <div className='absolute right-8 top-20 bg-gray-200 border border-gray-400 rounded-lg p-3 z-20'>
            <SmallCalendar value={calenderValue} onChange={handleDateSelected} ref={outsideRef} />
          </div>
        )}
      </div>
    </>
  );
});

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  isError?: boolean;
  errorMessage?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ isError, errorMessage, ...props }, ref) {
  return (
    <>
      <div className='relative w-full'>
        <textarea
          {...props}
          ref={ref}
          className={`w-full h-[34.6rem] p-4 border rounded-md resize-none transition ${isError ? 'border-red-500' : 'border-gray-400'} focus:border-darkgreen placeholder-gray-600`}
        />
      </div>
      {isError && <p className='pl-2 text-sm text-red-500'>{errorMessage}</p>}
    </>
  );
});
