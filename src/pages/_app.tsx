import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/Layout';
import Modal from '@/components/DialogsModal';
import darkModeStore from '@/context/themeContext';
import ModalContextProvider from '@/context/modalContext';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { isDarkMode } = darkModeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const renderContent = () => {
    switch (pageProps.layoutType) {
      case 'removeLayout':
        return <Component {...pageProps} />;
      default:
        return (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ModalContextProvider>
          {renderContent()}
          <Modal />
        </ModalContextProvider>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
