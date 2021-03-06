import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { supabase } from '@utils/supabaseClient';
import Layout from '@components/common/Layout/Layout';
import Heart from '@components/icons/Heart';

export default function Home() {
  return (
    <>
      <Head>
        <title>Trillo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative mx-auto h-full w-full xl:max-w-4xl flex md:flex-col items-center justify-center">
        <section className="w-full flex flex-col md:flex-row">
          <section className="flex-1">
            <h1 className="font-semibold text-4xl md:text-7xl text-center md:text-left">
              The best way to track whatever you want
            </h1>
          </section>
          <section className="flex-1 flex justify-center">
            <img src="/img/good-team-animate.svg" className="w-96" />
          </section>
        </section>
        <footer className="absolute bottom-0 w-full">
          <p className="text-center">
            Made with
            <span className="inline text-red-500">
              <Heart />
            </span>
            , for Princess Diana
          </p>
        </footer>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  if (user) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
