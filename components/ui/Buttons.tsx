import { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'primary' | 'ghost';
}

const getStyle = (type: 'primary' | 'ghost') => {
  switch (type) {
    case 'primary':
      return 'bg-brand-blue text-white ';
    case 'ghost':
      return 'text-brand-blue';
  }
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`p-2 rounded font-semibold ${getStyle(props.buttonType)}`}
    >
      {props.children}
    </button>
  );
};

export const ButtonLink = ({
  href,
  ...props
}: ButtonProps & { href: string }) => {
  return (
    <Link href={href}>
      <a>
        <Button {...props} />
      </a>
    </Link>
  );
};

export default Button;
