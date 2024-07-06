import { instance } from '@/apis/axios';
import { ICON, IMAGE } from '@/constant/importImages';
import { useOutsideClick, useToggleButton } from '@/hooks';
import { myInfoProps } from '@/utils/props-type';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Avatar from '../../Avatar';
import DropdownMenu from '@/components/DropdownMenu';
// import Modal from '../Modals';

export default function Header() {
  const router = useRouter();
  const [Auth, setAuth] = useState(false);
  const { isToggle: isDropdownOpen, handleToggleClick: isDropdownOpenToggle } = useToggleButton();
  const { isToggle: isNotificationOpen, handleToggleClick: isNotificationOpenToggle } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref, isDropdownOpen, isDropdownOpenToggle);

  const getMyInfo = async () => {
    const { data } = await instance.get<myInfoProps>('/users/me');
    return data;
  };

  const { data: MyInfoData, isPending } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    retry: 1,
  });

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (!localStorage.getItem('accessToken')) {
      isDropdownOpenToggle();
      router.push('/signin');
    }
  };

  const handleMyPageClick = () => {
    isDropdownOpenToggle();
    router.push('/mypage');
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
    <div className='flex justify-around items-center fixed top-0 w-full h-28 bg-white border-b border-gray-300 z-50'>
      <div className='flex justify-between items-center max-w-screen-xl w-full mx-auto px-6'>
        <Link href='/'>
          <Image src={IMAGE.logo.nav.src} alt={IMAGE.logo.nav.alt} height={28} width={166} />
        </Link>
        <div>
          {!Auth ? (
            <div className='flex gap-10'>
              <Link href='/signin' className='flex items-center text-lg font-medium text-black'>
                로그인
              </Link>
              <Link href='/signup' className='flex items-center text-lg font-medium text-black'>
                회원가입
              </Link>
            </div>
          ) : (
            <div className='relative flex items-center gap-10'>
              <button className='flex items-center' onClick={isNotificationOpenToggle}>
                <Image src={ICON.notification.default.src} alt={ICON.notification.default.alt} />
              </button>
              {/* {isNotificationOpen && (
                <Modal
                  className="absolute top-24 left-0 lg:left-[-225px] w-96"
                  modalType='notifications'
                  setShowModal={isNotificationOpenToggle}
                />
              )} */}
              <div className='relative flex items-center gap-10'>
                <div className='h-9 border-r border-gray-300' />
                <div className='flex items-center gap-4'>
                  <Avatar profileImageUrl={MyInfoData?.profileImageUrl} type='gnb' />
                  <button className='flex items-center text-lg font-medium text-black' onClick={isDropdownOpenToggle} ref={ref}>
                    {MyInfoData?.nickname}
                  </button>
                  {isDropdownOpen && <DropdownMenu type='gnb' dropdownMenuList={MyMenuList} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
