import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.svg";
import { navbarItems } from "./navBarItems";
import { COOKIE_ROUTE, DISCLAIMER_ROUTE, EULA_ROUTE, GENERATOR_ROUTE, POLICY_ROUTE, TERMS_ROUTE } from "@/routes";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__firstBlock}>
        <Image src={Logo} alt="nextry logo" />
        <nav className={style.nav}>
          {navbarItems.map(({ id, title, route }) => (
            <Link key={id} href={route}>
              {title}
            </Link>
          ))}
        </nav>
        <Link className={style.aiGenerator} href={GENERATOR_ROUTE} prefetch={false}>
          TRY AI GENERATOR
        </Link>
      </div>
      <div className={style.footer__line} />
      <div className={style.footer__secondBlock}>
        <div className={style.footer__secondBlock__documents}>
          <Link href={POLICY_ROUTE} target="_blank">Privacy Policy</Link>
          <Link href={TERMS_ROUTE} target="_blank">Terms of Use</Link>
          <Link href={COOKIE_ROUTE} target="_blank">Cookie Policy</Link>
          <Link href={DISCLAIMER_ROUTE} target="_blank">Disclaimer</Link>
          <Link href={EULA_ROUTE} target="_blank">End-User License Agreement</Link>
        </div>
        <p>2023. AI Generator. All rights are reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
