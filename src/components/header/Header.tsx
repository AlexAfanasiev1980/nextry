"use client";

import Image from "next/image";
import cookie from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/public/Logo.svg";
import BurgerIcon from "@/public/burgerIcon.png";
import { navbarItemsHome, navbarItemsGenerator } from "./navBarItems";
import {
  GENERATOR_BACKGROUND,
  GENERATOR_FACE,
  GENERATOR_ROUTE,
  HOME_ROUTE,
  SELECT_AUTH_ROUTE,
} from "@/routes";
import style from "./Header.module.scss";
import { useRouter } from "next/navigation";
import Button from "../ui/button/Button";

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
  const [isMenuVisible, setMenuVisiability] = useState(false);
  const [session, setSession] = useState<boolean | null>(null);
  const burgerWrapperClassname = isMenuVisible
    ? style.burgerWrapper
    : [style.burgerWrapper, style.burgerWrapperInvisible].join(" ");
  const router = useRouter();

  const handleLogOut = async () => {
    if (session) {
      await cookie.remove("OutSiteJWT");
      setSession(false);
      router.push("/");
    }
  };

  const Tools = () => {
    return (
      <div className={style.dropdown}>
        <button className={style.dropdown__dropbtn}>Tools</button>
        <nav className={style.dropdown__dropdownContent}>
          <Link href={GENERATOR_ROUTE} prefetch={false}>
            Virtual fitting room
          </Link>
          <Link href={GENERATOR_BACKGROUND} prefetch={false}>
            Change background
          </Link>
          <Link href="#" prefetch={false}>
            Animal face swap
          </Link>
        </nav>
      </div>
    );
  };

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
          <Tools />
          {session ? (
            <button
              onClick={() => handleLogOut()}
              className={style.logInBurger}
            >
              Log Out
            </button>
          ) : (
            <Link className={style.logInBurger} href={SELECT_AUTH_ROUTE}>
              Log In / Sign Up
            </Link>
          )}
        </nav>
      </div>
    );
  };

  useEffect(() => {
    if (cookie.get("OutSiteJWT")) {
      setSession(true);
    } else {
      setSession(false);
    }
  }, []);

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
        <Tools />
      </nav>
      <Image
        src={BurgerIcon}
        alt="menu icon"
        onClick={() => setMenuVisiability(!isMenuVisible)}
        className={style.burger}
      />
      <Button
        type="button"
        onClick={
          session === true
            ? () => handleLogOut()
            : () => router.push(SELECT_AUTH_ROUTE)
        }
        className={session === false ? style.logIn : style.logOut}
      >
        {session === true
          ? "Log Out"
          : session === false
          ? "Log In / Sign Up"
          : ""}
      </Button>
      <MenuBurger />
    </header>
  );
};

export default Header;
