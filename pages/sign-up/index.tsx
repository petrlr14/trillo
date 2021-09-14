import { GetServerSideProps } from 'next';
import { supabase } from '../../utils/supabaseClient';

const SignUp = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <h1>Im on it, wait</h1>
    </main>
  );
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
