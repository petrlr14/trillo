import '../styles/globals.css';
import 'nprogress/nprogress.css';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@context/AuthContext';
import CreateBoard from '@components/modals/CreateBoard';
import { CreateBoardProvider } from '@context/CreateBoardContext';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const TopProgress = dynamic(() => import('@components/common/Progress'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AuthProvider>
      <CreateBoardProvider>
        <div>
          <CreateBoard />
          <Toaster position="top-right" />
        </div>
        <TopProgress />
        {getLayout(<Component {...pageProps} />)}
      </CreateBoardProvider>
    </AuthProvider>
  );
}

export default MyApp;
