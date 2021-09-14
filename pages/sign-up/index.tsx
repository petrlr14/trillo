import { GetServerSideProps } from 'next';
import { ReactElement, SyntheticEvent, useState } from 'react';
import {
  faGithub,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../components/common/Logo';
import Button from '../../components/ui/Buttons';
import Input from '../../components/ui/Input';
import { signUp } from '../../utils/supabaseAuth';
import { supabase } from '../../utils/supabaseClient';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/common/AuthLayout';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Email and password cannot be empty');
      return;
    }
    try {
      await signUp({ email, password });
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
        <title>Sign Up</title>
      </Head>
      <main className="h-screen flex flex-col justify-center items-center space-y-2 px-4">
        <Logo />
        <form
          className="w-full max-w-md rounded border shadow-md py-10 bg-white"
          onSubmit={onSubmit}
        >
          <h1 className="text-center font-semibold">Sign up in Trillo</h1>
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
              Sign Up
            </button>
          </div>
          <Link href="/sign-in">
            <a className="my-4 block text-center text-brand-blue hover:underline">
              Already have an account?
            </a>
          </Link>
        </form>
      </main>
    </>
  );
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  console.log(user);
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

export default SignUp;
