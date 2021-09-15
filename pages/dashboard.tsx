import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '@components/common/Layout/Layout';
import { supabase } from '@utils/supabaseClient';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data, error, user } = await supabase.auth.api.getUserByCookie(
    context.req
  );
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Dashboard;
