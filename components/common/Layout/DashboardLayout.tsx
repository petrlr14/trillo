import { FC, ReactElement, useContext } from 'react';
import NavLink from '@components/common/NavLink';
import Logo from '@components/common/Logo';
import { AuthContext } from '@context/AuthContext';
import Button, { ButtonLink } from '@components/ui/Buttons';
import Trillo from '@components/icons/Trillo';
import Home from '@components/icons/Home';
import { signOut } from '@utils/supabaseAuth';
import Logout from '@components/icons/Logout';
import { CreateBoardContext } from '@context/CreateBoardContext';
import Header from '@components/common/Layout/Header';

const DashboardLayout: FC = (props) => {
  return (
    <div className="flex flex-col w-full h-screen min-h-screen bg-white">
      <Header />
      <main className="px-5 py-10 mx-auto h-full w-full max-w-7xl flex">
        <nav className="w-56 px-2 hidden md:block">
          <ul className="space-y-2">
            <li>
              <NavLink
                activeClassname="bg-red-300 text-red-800"
                className=""
                href="/dashboard"
              >
                Boards
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassname="bg-red-300 text-red-800"
                className=""
                href="/dashboard/settings"
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
        <section className="w-full h-full">{props.children}</section>
      </main>
    </div>
  );
};

export const getDashboardLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardLayout;
