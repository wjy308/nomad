import React from 'react';
import CustomButton from '@/components/Button/CustomButton';
import GrayButton from '@/components/Button/GrayButton';
import useModal from '@/hooks/useModal';

function Index() {
  const { openModal, closeModal } = useModal();

  // Example Modal ------------------------
  const handleOpenAlertModal = () => {
    openModal({
      modalType: 'alert',
      content: 'Alert 모달입니다.',
      btnName: ['확인'],
    });
  };

  const handleOpenConfirmModal = () => {
    openModal({
      modalType: 'confirm',
      content: 'Confirm 모달입니다.',
      btnName: ['아니오', '취소하기'],
      callBackFnc: () => {
        alert('콜백 함수 실행');
        closeModal();
      },
    });
  };
  // ------------------------------------

  return (
    <>
      <CustomButton text='로그인 하기' color='black' onClick={() => alert('로그인 하기')} />
      <hr />
      <CustomButton text='로그인 하기' color='white' onClick={() => alert('로그인 하기')} />
      <hr />
      <GrayButton text='신청 불가' onClick={() => alert('신청 불가')} />
      <hr />
      <CustomButton text='alert 모달 열기' color='white' onClick={handleOpenAlertModal} />
      <hr />
      <CustomButton text='confirm 모달 열기' color='white' onClick={handleOpenConfirmModal} />
    </>
  );
}

export default Index;
