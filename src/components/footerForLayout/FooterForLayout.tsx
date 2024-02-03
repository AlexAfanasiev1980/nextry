import Link from "next/link";
import Typography from "../ui/typography/Typography";
import { links } from "./consts";
import style from "./footerForLayout.module.scss";

export default function FooterForLayout() {
  return (
    <footer className={style.footer}>
      <div>
        <Typography variant="p2" className={style.footer__text}>
          © 2024 nextry.app. All rights reserved
        </Typography>
      </div>
      <div>
        <ul className={style.footer__links}>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.link} target="_blank">{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
