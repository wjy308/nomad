import React from 'react';

/**
 * DropdownMenuProps 인터페이스는 DropdownMenu 컴포넌트의 props를 정의합니다.
 */
interface DropdownMenuProps {
  /**
   * 드롭다운 메뉴의 타입을 정의합니다.
   * 'meatball'은 세 개의 점으로 된 아이콘을 의미하고,
   * 'gnb'는 네비게이션 바에서 사용되는 드롭다운을 의미합니다.
   * @default 'gnb'
   */
  type?: 'meatball' | 'gnb';

  /**
   * 드롭다운 메뉴 항목의 배열을 정의합니다.
   * 각 항목은 텍스트와 클릭 핸들러를 포함합니다.
   */
  dropdownMenuList: { text: string; handleClick: () => void }[];
  positionClasses?: string;
}

/**
 * DropdownMenu 컴포넌트는 드롭다운 메뉴를 렌더링합니다.
 *
 * @param {DropdownMenuProps} props - 컴포넌트에 전달되는 props
 * @param {'meatball' | 'gnb'} [props.type='gnb'] - 드롭다운 메뉴의 타입을 정의합니다.
 * @param {Array<{ text: string; handleClick: () => void }>} props.dropdownMenuList - 드롭다운 메뉴 항목의 배열을 정의합니다.
 * @returns {JSX.Element} 드롭다운 메뉴 컴포넌트
 *
 * @example
 * // 네비게이션 바에서 사용되는 드롭다운 메뉴
 * <DropdownMenu
 *   type="gnb"
 *   dropdownMenuList={[
 *     { text: '내 정보', handleClick: () => console.log('내 정보 클릭') },
 *     { text: '로그아웃', handleClick: () => console.log('로그아웃 클릭') }
 *   ]}
 * />
 *
 * @example
 * // 미트볼 아이콘으로 표시되는 드롭다운 메뉴
 * <DropdownMenu
 *   type="meatball"
 *   dropdownMenuList={[
 *     { text: '설정', handleClick: () => console.log('설정 클릭') },
 *     { text: '도움말', handleClick: () => console.log('도움말 클릭') }
 *   ]}
 * />
 */
function DropdownMenu({ type = 'gnb', dropdownMenuList, positionClasses = '' }: DropdownMenuProps): JSX.Element {
  const baseStyles = 'absolute top-full right-0 w-[16rem] z-10 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-black';
  const typeStyles = type === 'meatball' ? 'mt-12 md:mt-8' : 'mt-16 md:mt-8';

  return (
    <div className={`${positionClasses}${baseStyles} ${typeStyles}`}>
      {dropdownMenuList.map((dropdownMenu) => (
        <button
          key={dropdownMenu.text}
          onClick={dropdownMenu.handleClick}
          className='flex items-center justify-center md:w-[16rem] w-[14rem] md:h-[6.2rem] h-[4.9rem] md:text-[1.8rem] text-[1.4rem] font-medium border-t border-gray-300 text-gray-800 hover:bg-gray-300 first:border-t-0 first:rounded-t-lg last:rounded-b-lg dark:text-gray-10'
          type='button' // 버튼에 타입 속성 추가
        >
          {dropdownMenu.text}
        </button>
      ))}
    </div>
  );
}

// 기본값 설정
DropdownMenu.defaultProps = {
  type: 'gnb',
};

export default DropdownMenu;
