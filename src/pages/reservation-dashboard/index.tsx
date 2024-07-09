import { useEffect, useState } from 'react';
import Footer from '@/components/Layout/Footer';
import visibleFooter from './visibleFooter';

export const getStaticProps = async () => ({
  props: {
    layoutType: 'removeFooter',
  },
});

export function Index() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(true);

  useEffect(() => visibleFooter(setIsMobileOrTablet), []);

  return (
    <>
      <main>예약현황</main>
      {isMobileOrTablet ? null : <Footer />} {/* 모바일 및 태블릿 사이즈일 때는 Footer 숨김 */}
    </>
  );
}

export default Index;
