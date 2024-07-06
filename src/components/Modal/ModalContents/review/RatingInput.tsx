import React, { useState } from 'react';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import { ICON } from '@/constant';
import Image from 'next/image';

const { star } = ICON;

interface StarProps {
  selected: boolean;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, onClick, onMouseOut, onMouseOver }: StarProps) {
  const StarAction = selected ? star.active.src : star.default.src;
  return (
    <Image
      src={StarAction}
      alt={star.default.alt}
      layout='fill'
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      className='cursor-pointer'
    />
  );
}

interface RatingInputProps {
  setValue: UseFormSetValue<any>;
  control: Control<any>;
}

export default function RatingInput({ setValue, control }: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value: number) => {
    setValue('rating', value);
  };

  const handleStarMouseOver = (value: number) => {
    setHoverRating(value);
  };

  const handleStarMouseOut = () => {
    setHoverRating(0);
  };

  return (
    <Controller
      control={control}
      name='rating'
      render={({ field: { onChange, value } }) => (
        <ul className='flex items-start mt-16 mb-8 gap-2 md:mt-4 md:mb-4'>
          {RATINGS.map((rating) => (
            <li key={rating} className='relative w-14 h-14 md:w-10 md:h-10'>
              <Star
                selected={rating <= (hoverRating || value)}
                onClick={() => handleStarClick(rating)}
                onMouseOver={() => handleStarMouseOver(rating)}
                onMouseOut={handleStarMouseOut}
              />
            </li>
          ))}
        </ul>
      )}
    />
  );
}
