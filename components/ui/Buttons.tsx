import { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary' | 'ghost' | 'custom';
}

const getStyle = (type: 'primary' | 'ghost' | 'custom') => {
  switch (type) {
    case 'primary':
      return 'bg-brand-blue text-white ';
    case 'ghost':
      return 'text-brand-blue';
    default:
      return '';
  }
};

const Button = ({ buttonType = 'custom', ...props }: ButtonProps) => {
  return (
    <button
      className={`p-2 rounded font-semibold ${getStyle(buttonType)}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const ButtonLink = ({
  href,
  buttonType = 'custom',
  ...props
}: ButtonProps & { href: string }) => {
  return (
    <Link href={href}>
      <a>
        <Button buttonType={buttonType} {...props} />
      </a>
    </Link>
  );
};

export default Button;
