import Button from "@/components/ui/button/Button";
import Link from "next/link";
import style from "./selectAuth.module.scss";
import BackButton from "@/components/ui/button/backButton/BackButton";

export default function SelectAuthPage() {
  return (
    <div className={style.selectAuth}>
      <div className={style.selectAuth__back}>
        <BackButton link={"/"} />
      </div>

      <Button type="button" className={style.selectAuth__button}>
        <Link href="/sign-in" className={style.selectAuth__link}>
          Log in
        </Link>
      </Button>
      <Button type="button" className={style.selectAuth__button}>
        <Link href="/sign-up" className={style.selectAuth__link}>
          Sign up
        </Link>
      </Button>
    </div>
  );
}
