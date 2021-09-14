import Logo from '../../components/common/Logo';
import Input from '../../components/ui/Input';

const SignIn = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-2">
      <Logo />
      <form className="w-full max-w-md rounded border shadow-md py-10">
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
          <div>
            <button>
              <i className="fab fa-google"></i>
            </button>
            <button></button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
