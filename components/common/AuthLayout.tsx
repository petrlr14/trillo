import { FC } from 'react';

const AuthLayout: FC = ({ children }) => {
  return (
    <div className="w-full relative">
      {children}
      <img
        src="/img/working.svg"
        className="hidden md:block w-96 absolute top-0 left-0 -z-10"
      />
      <img
        src="/img/sing.svg"
        className="hidden md:block w-96 absolute bottom-0 right-0 -z-10"
      />
    </div>
  );
};

export default AuthLayout;
