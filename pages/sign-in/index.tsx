import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Logo from '../../components/common/Logo';
import Button from '../../components/ui/Buttons';
import Input from '../../components/ui/Input';
import signInWithGoogle, { signIn } from '../../utils/supabaseAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
      await signIn(email, password);
    } catch (e) {
      switch (e.status) {
        case 400:
          toast.error(e.message);
      }
    }
  };
  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-2">
      <Logo />
      <form
        className="w-full max-w-md rounded border shadow-md py-10"
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
              signInWithGoogle('google');
            }}
          >
            <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
          </Button>
          <Button
            buttonType="ghost"
            type="button"
            onClick={() => {
              signInWithGoogle('twitter');
            }}
          >
            <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
          </Button>
          <Button
            buttonType="ghost"
            type="button"
            onClick={() => {
              signInWithGoogle('github');
            }}
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </Button>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
