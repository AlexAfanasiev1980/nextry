import Image from "next/image";
import style from "./backButton.module.scss";
import ArrowBack from "@/public/ArrowBack.png";
import Link from "next/link";

interface IBackButton {
  link?: string;
}

export default function BackButton({ link }: IBackButton) {
  return (
    <>
      {!link ? null : (
        <Link href={link} className={style.button}>
          <Image src={ArrowBack} alt="move back img" />
        </Link>
      )}
    </>
  );
}
