import Logo from "components/icons/logo";
import Link from "next/link";
import { pages } from "./constants";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <header className="z-[9999] sticky top-0 flex w-full h-header justify-between items-center px-6 bg-background">
      <div className="flex h-full gap-[60px]">
        <LogoWithText />
        <nav className="hidden tablet:flex gap-2 h-full items-center">
          {pages.map(({ name, link }) => {
            return (
              <Link key={name} className="font-semibold text-[#F8F9FE]" href={link}>
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
      <MobileMenu />
    </header>
  );
};

export default Navbar;

const LogoWithText = () => {
  return (
    <Link className="flex items-center gap-2 cursor-pointer" href="/">
      <Logo width={38} height={32} />
      <span className="text-[#93EBFF] font-bold text-[22px]">NerdPlanet</span>
    </Link>
  );
};
