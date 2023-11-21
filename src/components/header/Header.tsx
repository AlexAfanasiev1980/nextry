"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/public/Logo.svg";
import BurgerIcon from "@/public/burgerIcon.png";
import { navbarItemsHome, navbarItemsGenerator } from "./navBarItems";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "@/routes";
import { useSession, signOut } from "next-auth/react";
import style from "./Header.module.scss";

interface IHeader {
  type: "home" | "generator";
}

const headerTypes = {
  home: {
    navBarItems: navbarItemsHome,
    className: style.header,
  },
  generator: {
    navBarItems: navbarItemsGenerator,
    className: [style.header, style.generator].join(" "),
  },
};

const Header = ({ type }: IHeader) => {
  const session = useSession();
  const [isMenuVisible, setMenuVisiability] = useState(false);
  const burgerWrapperClassname = isMenuVisible
    ? style.burgerWrapper
    : [style.burgerWrapper, style.burgerWrapperInvisible].join(" ");
  if(process.env.NODE_ENV === "development") {
    console.log(session);
  }

  const MenuBurger = () => {
    return (
      <div
        className={burgerWrapperClassname}
        onClick={() => setMenuVisiability(false)}
      >
        <nav className={style.burgerMenu}>
          {headerTypes[type].navBarItems.map(({ id, title, route }) => (
            <Link key={id} href={route}>
              {title}
            </Link>
          ))}
          {session?.data ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className={style.logInBurger}
            >
              Log Out
            </button>
          ) : (
            <Link className={style.logInBurger} href={SIGN_IN_ROUTE}>
              Log In
            </Link>
          )}
        </nav>
      </div>
    );
  };

  return (
    <header className={headerTypes[type].className}>
      <Link href={HOME_ROUTE}>
        <Image src={Logo} alt="nextry logo" />
      </Link>
      <nav className={style.nav}>
        {headerTypes[type].navBarItems.map(({ id, title, route }) => (
          <Link key={id} href={route}>
            {title}
          </Link>
        ))}
      </nav>
      <Image
        src={BurgerIcon}
        alt="menu icon"
        onClick={() => setMenuVisiability(!isMenuVisible)}
        className={style.burger}
      />
      {session?.data ? (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={style.logIn}
        >
          Log Out
        </button>
      ) : (
        <Link className={style.logIn} href={SIGN_IN_ROUTE}>
          Log In
        </Link>
      )}
      <MenuBurger />
    </header>
  );
};

export default Header;
