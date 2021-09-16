import { AnchorHTMLAttributes, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className: string;
  activeClassname: string;
}

const NavLink = ({
  href,
  className,
  activeClassname,
  children,
}: NavLinkProps) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`block rounded py-1 px-5 w-full font-semibold hover:bg-brand-violet hover:text-brand-blue ${
          router.pathname === href ? activeClassname : className
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
