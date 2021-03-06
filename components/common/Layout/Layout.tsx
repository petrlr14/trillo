import { FC, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@context/AuthContext';
import Logo from '@components/common/Logo';
import Button, { ButtonLink } from '@components/ui/Buttons';
import { signOut } from '@utils/supabaseAuth';
import Logout from '@components/icons/Logout';

const Layout: FC = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col w-full h-screen min-h-screen bg-gradient-to-b from-brand-violet to-white">
      <header className="flex justify-between items-center p-2">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        {user ? (
          <div className="flex space-x-1">
            <ButtonLink
              href="/dashboard"
              className="flex items-center md:space-x-2 rounded border border-brand-blue py-0.5 px-1 hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
            >
              <p className="font-semibold hidden md:block">
                {user.user_metadata.full_name}
              </p>
              <img
                src={user.user_metadata.avatar_url}
                className="rounded-full w-10"
              />
            </ButtonLink>
            <Button
              className="text-red-600"
              onClick={async () => {
                signOut();
              }}
            >
              <Logout />
            </Button>
          </div>
        ) : (
          <div className="flex space-x-3">
            <ButtonLink buttonType="ghost" href="/sign-in">
              Sign in
            </ButtonLink>
            <ButtonLink buttonType="primary" href="/sign-up">
              Sign up
            </ButtonLink>
          </div>
        )}
      </header>
      {props.children}
    </div>
  );
};

export default Layout;

/* 
 
*/
