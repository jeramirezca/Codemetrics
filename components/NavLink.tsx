import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
}

const NavLink = ({ href, title }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE]  rounded md:p-0 hover:text-indigo-500 transition-colors duration-200 ease-in-out text-base"
    >
      {title}
    </Link>
  );
};

export default NavLink;