import '../styles/globals.css';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/248332ce05.js"
          crossOrigin="anonymous"
        />
      </Head>
      <div>
        <Toaster position="top-right" />
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
