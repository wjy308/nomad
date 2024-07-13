import React, { useState } from 'react';
import useModal from '@/hooks/useModal';
import Card from '@/components/Card';
import MyActibitiyCardInfo from '@/components/Card/myActibityCardInfo';
import AcitivitiesCardList from '@/components/CardList/AcitivitiesCardList';
import Pagination from '@/components/Pagination';
import SideNavigation from '@/components/SideNavigation';
import Button from '@/components/Button';
import { filterCategories } from '@/constant/filterCategoryOptions';
import CategoryButton from '@/components/FilterButton/CategoryButton';
import FilterDropButton from '@/components/FilterButton/FilterDropButton';
import { Input } from '@/components/Input';

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
  const { openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  // Example FilterButton ------------------------
  const [selectedCategory, setSelectedCategory] = useState<string>();

  // --------------------------------------

  return (
    <>
      <Button text='로그인 하기' color='black' />
      <hr />
      <Button text='로그인 하기' color='white' />
      <hr />
      <Button text='신청 불가' color='black' disabled />
      <hr />
      <Card image='/images/test123.png'>
        <MyActibitiyCardInfo data={cardData} />
      </Card>
      <hr />
      <Pagination currentPage={currentPage} totalPages={12} onPageChange={handlePageChange} />
      <hr />
      <SideNavigation />
      <hr />
      <Button text='alert 모달 열기' color='white' onClick={handleOpenAlertModal} />
      <hr />
      <Button text='confirm 모달 열기' color='white' onClick={handleOpenConfirmModal} />
      <hr />
      <AcitivitiesCardList activities={[]} />
      <hr />
      {filterCategories.map((category) => (
        <CategoryButton key={category} text={category} isSelected={selectedCategory === category} onClick={() => setSelectedCategory(category)} />
      ))}
      <FilterDropButton text='가격' />
      <br />
      <Input type='email' />
    </>
  );
}

export default Index;
