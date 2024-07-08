import React, { useState } from 'react';
import CustomButton from '@/components/Button/CustomButton';
import GrayButton from '@/components/Button/GrayButton';
import useModal from '@/hooks/useModal';
import Card from '@/components/Card';
import MyActibitiyCardInfo from '@/components/Card/myActibityCardInfo';
import AcitivitiesCardList from '@/components/CardList/AcitivitiesCardList';
import Pagination from '@/components/Pagination';

export const getStaticProps = async () => ({
  props: {
    layoutType: 'removeLayout',
  },
});

const cardData = {
  id: 0,
  userId: 0,
  title: 'string',
  description: 'string',
  category: 'string',
  price: 11110,
  address: 'string',
  bannerImageUrl: 'string',
  rating: 20,
  reviewCount: 1110,
  createdAt: 'string',
  updatedAt: 'string',
};

function Index() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

      <Card image='/images/test123.png'>
        <MyActibitiyCardInfo data={cardData} />
      </Card>
      <hr />
      <Pagination currentPage={currentPage} totalPages={12} onPageChange={handlePageChange} />
      <hr />
      <AcitivitiesCardList activities={[]} />
    </>
  );
}

export default Index;
