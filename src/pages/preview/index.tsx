import React, { useState } from 'react';
import useModal from '@/hooks/useModal';
import Pagination from '@/components/Pagination';
import SideNavigation from '@/components/SideNavigation';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';

export const getStaticProps = async () => ({
  props: {
    layoutType: 'removeLayout',
  },
});

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


  // Example Dropdown ------------------------
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const handleSelectedId = (id: Number) => {
    setSelectedCategoryId(id);
  };

  const dropdownLists = [
    { id: 1, category: 'Category 1', title: 'Option 1' },
    { id: 2, category: 'Category 2', title: 'Option 2' },
    { id: 3, category: 'Category 3', title: 'Option 3' },
  ];
  // ------------------------------------

  return (
    <>
      <Button text='로그인 하기' color='black' />
      <hr />
      <Button text='로그인 하기' color='white' />
      <hr />
      <Button text='신청 불가' color='black' disabled />
      <hr />
      <Pagination currentPage={currentPage} totalPages={12} onPageChange={handlePageChange} />
      <hr />
      <SideNavigation />
      <hr />
      <Button text='alert 모달 열기' color='white' onClick={handleOpenAlertModal} />
      <hr />
      <Button text='confirm 모달 열기' color='white' onClick={handleOpenConfirmModal} />
      <hr />
      <Dropdown name='exampleDropdown' labelText='Select an Option' lists={dropdownLists} onSelectedId={handleSelectedId} selectedCategoryId={selectedCategoryId} />
    </>
  );
}

export default Index;
