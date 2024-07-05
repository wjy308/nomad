import Image from 'next/image';
import React from 'react';

interface Props {
  image: string;
  children: React.ReactNode;
}

/** 카드 컴포넌트 imgae : 카드 이미지, children: 카드 내용 컴포넌트 넣으면 됨 */
export default function Card({ image, children }: Props) {
  return (
    <div className='rounded-[1.2rem] max-w-[79.2rem] w-full flex gap-x-[2.4rem] h-[20.4rem]'>
      <div className='w-[20.4rem]'>
        <Image src={image} alt='' fill />
      </div>
      <div className='pr-[2.4rem] flex justify-center items-center'>{children}</div>
    </div>
  );
}
