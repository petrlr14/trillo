import Logo from '../../components/common/Logo';
import Button from '../../components/ui/Buttons';
import Input from '../../components/ui/Input';
import signInWithGoogle from '../../utils/supabaseAuth';

const SignIn = () => {
  const onSubmit = () => {};
  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-2">
      <Logo />
      <form
        className="w-full max-w-md rounded border shadow-md py-10"
        onSubmit={onSubmit}
      >
        <h1 className="text-center font-semibold">Sign in to Trillo</h1>
        <div className="space-y-2 flex flex-col px-12">
          <Input type="email" placeholder="Enter your email" />
          <Input type="password" placeholder="Enter your password" />
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
            onClick={async () => {
              signInWithGoogle();
            }}
          >
            <i className="fab fa-google text-2xl" aria-hidden />
          </Button>
          <Button buttonType="ghost" type="button">
            <i className="fab fa-twitter text-2xl" aria-hidden />
          </Button>
          <Button buttonType="ghost" type="button">
            <i className="fab fa-github text-2xl" aria-hidden />
          </Button>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
