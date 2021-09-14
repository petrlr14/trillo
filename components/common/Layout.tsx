import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button, { ButtonLink } from '../ui/Buttons';
import { signOut, getUser, getSession } from '../../utils/supabaseAuth';
import { supabase } from '../../utils/supabaseClient';

const Layout: FC = (props) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        checkUser();
      }
    );
    checkUser();
    return () => authListener?.unsubscribe();
  }, []);

  const checkUser = () => {
    const data = getUser;
    setUserInfo(data);
  };

  return (
    <div className="flex flex-col w-full h-screen min-h-screen bg-gradient-to-b from-brand-violet to-white">
      <header className="flex justify-between items-center p-2">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        {userInfo ? (
          <div className="flex space-x-1">
            <ButtonLink
              href="/dashboard"
              className="flex items-center md:space-x-2 rounded border border-brand-blue py-0.5 px-1 hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
            >
              <p className="font-semibold hidden md:block">
                {userInfo.user_metadata.full_name}
              </p>
              <img
                src={userInfo.user_metadata.avatar_url}
                className="rounded-full w-10"
              />
            </ButtonLink>
            <Button
              className="text-red-600"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
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
