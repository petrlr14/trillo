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

const DashboardLayout: FC = (props) => {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(CreateBoardContext);
  return (
    <div className="flex flex-col w-full h-screen min-h-screen bg-white">
      <header className="p-2 flex justify-between bg-blue-900">
        <div className="flex items-center space-x-1">
          <Button className="hidden md:block p-2 text-white bg-[#ffffff4d] transition-colors font-semibold rounded hover:bg-[#ffffff33] cursor-pointer">
            <Home />
          </Button>
          <Button className="p-2 text-white bg-[#ffffff4d] transition-colors font-semibold rounded hover:bg-[#ffffff33] cursor-pointer">
            <Trillo />
          </Button>
        </div>
        <ButtonLink href="/dashboard" className="">
          <Logo letterFill="#fff" logoFill="#fff" />
        </ButtonLink>
        <div className="flex space-x-2">
          <Button
            className="p-2 bg-blue-200 text-brand-blue transition-colors font-semibold rounded hover:bg-blue-300 cursor-pointer"
            onClick={openModal}
          >
            Create
          </Button>
          <img
            src={user?.user_metadata.avatar_url}
            className="rounded-full w-10"
          />
          <Button className="text-red-400" onClick={signOut}>
            <Logout />
          </Button>
        </div>
      </header>
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

export function getDashboardLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
}

export default DashboardLayout;
