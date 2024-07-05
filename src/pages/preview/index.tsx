import React from 'react';
import CustomButton from '@/components/Button/CustomButton';
import GrayButton from '@/components/Button/GrayButton';

const index = () => (
  <>
    <CustomButton text='로그인 하기' color='black' onClick={() => alert('로그인 하기')} />
    <hr />
    <CustomButton text='로그인 하기' color='white' onClick={() => alert('로그인 하기')} />
    <hr />
    <GrayButton text='신청 불가' onClick={() => alert('신청 불가')} />
  </>
);

export default index;
