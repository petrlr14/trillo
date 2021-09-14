import { FC } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { ButtonLink } from '../ui/Buttons';

const Layout: FC = (props) => {
  return (
    <div className="flex flex-col w-full h-screen min-h-screen bg-gradient-to-b from-brand-violet to-white">
      <header className="flex justify-between items-center p-2">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <div className="space-x-3">
          <ButtonLink href="/sign-in" buttonType="ghost">
            Sign In
          </ButtonLink>
          <ButtonLink href="/sign-up" buttonType="primary">
            Sign Up
          </ButtonLink>
        </div>
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
