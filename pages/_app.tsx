import '../styles/globals.css';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
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

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AuthProvider>
      <CreateBoardProvider>
        <div>
          <CreateBoard />
          <Toaster position="top-right" />
        </div>
        {getLayout(<Component {...pageProps} />)}
      </CreateBoardProvider>
    </AuthProvider>
  );
}

export default MyApp;
