import Link from "next/link";
import { GENERATOR_ROUTE } from "@/routes";
import style from "../About.module.scss";

const TextSection = () => {
  return (
    <section className={style.about__textBlock}>
      <section>
        <h1>AI-POWERED</h1>
        <h2>photo generation made easy</h2>
      </section>
      <p>Find your style with our AI - fast and easy!</p>
      <Link className={style.generatorLink} href={GENERATOR_ROUTE} prefetch={false}>
        TRY AI GENERATOR
      </Link>
    </section>
  );
};

export default TextSection;
