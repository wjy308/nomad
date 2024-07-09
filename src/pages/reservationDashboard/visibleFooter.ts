// pc 사이즈 일때만 footer가 보이게 하는 함수
const visibleFooter = (setIsMobileOrTablet: React.Dispatch<React.SetStateAction<boolean>>) => {
  const updateLayout = () => {
    setIsMobileOrTablet(window.innerWidth < 1024); // PC 사이즈 (1024px 이상)면 false, 그 외는 true
  };

  // 초기 실행
  updateLayout();

  // resize 이벤트 핸들러 등록
  window.addEventListener('resize', updateLayout);

  // cleanup
  return () => {
    window.removeEventListener('resize', updateLayout); // 컴포넌트 언마운트 시 resize 이벤트 핸들러 제거
  };
};

export default visibleFooter;
