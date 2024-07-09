import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type Children = {
  children: ReactNode;
  showFooter?: boolean;
};
export default function Layout({ children, showFooter = true }: Children) {
  return (
    <>
      <Header />
      <div>{children}</div>
      {showFooter && <Footer />}
    </>
  );
}
