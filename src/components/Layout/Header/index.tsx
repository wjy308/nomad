import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import instance from '@/apis/axios';
import { ICON, IMAGE } from '@/constant/importImages';
import useToggleButton from '@/hooks/useToggleButton';
import useOutsideClick from '@/hooks/useOutsideClick';
import { MyInfoProps } from '@/utils/types';
import DropdownMenu from '@/components/DropdownMenu';
import Avatar from '@/components/Avatar';
import DarkModeButton from '@/components/DarkModeButton';
import DarkModeStore from '@/context/themeContext';
import Notifications from '@/components/Modal/ModalContents/notifications';
// import Modal from '../Modals';

/**
 * Header 컴포넌트는 네비게이션 바를 렌더링합니다.
 * 사용자 인증 상태에 따라 로그인/회원가입 링크 또는 사용자 정보와 드롭다운 메뉴를 표시합니다.
 *
 * @returns {JSX.Element | null} 네비게이션 바 컴포넌트
 */
export default function Header(): JSX.Element | null {
  const router = useRouter();
  const [Auth, setAuth] = useState(false);
  const { isToggle: isDropdownOpen, handleToggleClick: isDropdownOpenToggle } = useToggleButton();
  const { isToggle: isNotificationOpen, handleToggleClick: isNotificationOpenToggle } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);
  const notiButtonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref, isDropdownOpen, isDropdownOpenToggle);

  const { isDarkMode } = DarkModeStore();

  /**
   * 현재 사용자의 정보를 가져오는 함수입니다.
   * @returns {Promise<MyInfoProps>} 사용자 정보 데이터
   */
  const getMyInfo = async () => {
    const { data } = await instance.get<MyInfoProps>('/users/me');
    return data;
  };

  const { data: MyInfoData, isPending } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    retry: 1,
  });

  /**
   * 로그아웃 핸들러 함수입니다. 사용자의 토큰을 삭제하고 로그인 페이지로 리디렉션합니다.
   */
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (!localStorage.getItem('accessToken')) {
      isDropdownOpenToggle();
      router.push('/signin');
    }
  };

  /**
   * 마이페이지 클릭 핸들러 함수입니다. 드롭다운 메뉴를 닫고 마이페이지로 리디렉션합니다.
   */
  const handleMyPageClick = () => {
    isDropdownOpenToggle();
    router.push('/my/profile');
  };

  const MyMenuList = [
    {
      text: '내 정보',
      handleClick: handleMyPageClick,
    },
    {
      text: '로그아웃',
      handleClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      setAuth(true);
      return;
    }
    setAuth(false);
  }, []);

  if (isPending) {
    return null;
  }

  return (
    <div className='flex justify-around items-center sticky top-0 w-full h-28 bg-white border-b border-gray-300 z-50 dark:bg-[#000]'>
      <div className='flex justify-between items-center max-w-screen-xl w-full mx-auto px-6'>
        <Link href='/'>
          <Image src={isDarkMode ? IMAGE.darkLogo.src : IMAGE.logo.nav.src} alt={isDarkMode ? IMAGE.logo.nav.alt : IMAGE.darkLogo.alt} height={28} width={166} />
        </Link>
        <div className='flex items-center gap-10'>
          <DarkModeButton />
          {!Auth ? (
            <div className='flex gap-10'>
              <Link href='/signin' className='flex items-center text-[1.4rem] font-medium text-black dark:text-gray-10'>
                로그인
              </Link>
              <Link href='/signup' className='flex items-center text-[1.4rem] font-medium text-black dark:text-gray-10'>
                회원가입
              </Link>
            </div>
          ) : (
            <div className='relative flex items-center gap-10'>
              <button type='button' className='flex items-center' onClick={isNotificationOpenToggle} ref={notiButtonRef}>
                <Image src={isDarkMode ? ICON.darkModeBell.default.src : ICON.notification.default.src} alt={isDarkMode ? ICON.darkModeBell.default.alt : ICON.notification.default.alt} />
              </button>
              <div className='relative flex items-center gap-10'>
                <div className='h-9 border-r-2 border-gray-100 dark:border-gray-10' />
                <div className='flex items-center gap-4'>
                  <Avatar profileImageUrl={MyInfoData?.profileImageUrl} type='gnb' />
                  <button type='button' className='flex items-center text-[1.4rem] font-medium text-black dark:text-gray-10' onClick={isDropdownOpenToggle} ref={ref}>
                    {MyInfoData?.nickname}
                  </button>
                  {isDropdownOpen && <DropdownMenu type='gnb' dropdownMenuList={MyMenuList} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isNotificationOpen && <Notifications onClose={isNotificationOpenToggle} notificationButtonRef={notiButtonRef} />}
    </div>
  );
}
