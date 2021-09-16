import { getDashboardLayout } from '@components/common/Layout/DashboardLayout';
import Head from 'next/head';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
    </>
  );
};

Settings.getLayout = getDashboardLayout;

export default Settings;
