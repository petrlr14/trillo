import React, { useContext, Fragment } from 'react';
import Logo from '@components/common/Logo';
import Home from '@components/icons/Home';
import Logout from '@components/icons/Logout';
import Trillo from '@components/icons/Trillo';
import Button, { ButtonLink } from '@components/ui/Buttons';
import { AuthContext } from '@context/AuthContext';
import { CreateBoardContext } from '@context/CreateBoardContext';
import { signOut } from '@utils/supabaseAuth';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

interface HeaderProps {
  bgColor?: string;
}

const Header = ({ bgColor = 'bg-blue-900' }: HeaderProps) => {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(CreateBoardContext);
  return (
    <header className={`relative p-2 flex justify-between ${bgColor}`}>
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
      <div className="flex space-x-2 items-center">
        <Button
          className="p-2 bg-blue-200 text-brand-blue transition-colors font-semibold rounded hover:bg-blue-300 cursor-pointer"
          onClick={openModal}
        >
          Create
        </Button>
        <Menu as="div" className="relative flex-shrink-0">
          <Menu.Button className="h-full flex items-center">
            <img
              src={
                user?.user_metadata.avatar_url ||
                'https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png'
              }
              className="rounded-full w-10"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
              <Menu.Item>
                <ButtonLink
                  href="/dashboard/settings"
                  className="w-full flex space-x-1 p-2 hover:bg-blue-300"
                >
                  <span>Settings</span>
                </ButtonLink>
              </Menu.Item>
              <Menu.Item
                as="button"
                className="w-full flex space-x-1 p-2 transition-colors hover:bg-red-500 hover:text-white"
                onClick={signOut}
              >
                <Logout />
                <span>Log out</span>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
