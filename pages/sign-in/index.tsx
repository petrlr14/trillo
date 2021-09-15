import Link from 'next/link';
import Head from 'next/head';
import Logo from '../../components/common/Logo';
import Button from '../../components/ui/Buttons';
import Input from '../../components/ui/Input';
import { signIn, signInWithProvider } from '../../utils/supabaseAuth';
import { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/common/AuthLayout';
import Google from '../../components/icons/Google';
import Twitter from '../../components/icons/Twitter';
import Github from '../../components/icons/Github';
import { GetServerSideProps } from 'next';
import { supabase } from '../../utils/supabaseClient';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Email and password cannot be empty');
      return;
    }
    try {
      await signIn({ email, password });
    } catch (e) {
      switch (e.status) {
        case 400:
          toast.error(e.message);
      }
    }
  };
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main className="h-screen flex flex-col justify-center items-center space-y-2 px-4">
        <Logo />
        <form
          className="w-full max-w-md rounded border shadow-md py-10 bg-white"
          onSubmit={onSubmit}
        >
          <h1 className="text-center font-semibold">Sign in to Trillo</h1>
          <div className="space-y-2 flex flex-col px-12">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={({ target: { value } }) => {
                setEmail(value);
              }}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
            />
            <button
              type="submit"
              className="p-1 bg-brand-blue text-white font-semibold"
            >
              Sign In
            </button>
            <p className="text-center">or</p>
          </div>
          <div className="w-full flex justify-around">
            <Button
              buttonType="ghost"
              type="button"
              onClick={() => {
                signInWithProvider('google');
              }}
            >
              <Google />
            </Button>
            <Button
              buttonType="ghost"
              type="button"
              onClick={() => {
                signInWithProvider('twitter');
              }}
            >
              <Twitter />
            </Button>
            <Button
              buttonType="ghost"
              type="button"
              onClick={() => {
                signInWithProvider('github');
              }}
            >
              <Github />
            </Button>
          </div>
          <Link href="/sign-up">
            <a className="block text-center text-brand-blue hover:underline">
              Don&apos;t have an account?
            </a>
          </Link>
        </form>
      </main>
    </>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  if (user) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
      },
    };
  }
  return {
    props: {},
  };
};

export default SignIn;
