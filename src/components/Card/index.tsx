import Image from 'next/image';
import React from 'react';

interface Props {
  image: string;
  children: React.ReactNode;
}

/** 카드 컴포넌트 imgae : 카드 이미지, children: 카드 내용 컴포넌트 넣으면 됨 */
export default function Card({ image, children }: Props) {
  return (
    <div className='rounded-[1.2rem] max-w-[79.2rem] w-full flex gap-x-[2.4rem] h-[20.4rem] max-xl:h-[15.6rem] max-md:h-[12.8rem] max-xl:gap-x-[1.2rem] max-md:gap-x-[0.8rem]'>
      <div className='w-[20.4rem] h-[20.4rem] max-xl:w-[15.6rem] max-xl:h-[15.6rem] max-md:w-[12.8rem] max-md:h-[12.8rem]'>
        <Image src={image} alt='' fill />
      </div>
      <div className='pr-[2.4rem] flex justify-center items-center max-xl:pr-[1.8rem] max-md:pr-[1.4rem]'>{children}</div>
    </div>
  );
}
