import Image from "next/image";
import { texts } from "./componentsAndHandlers/howItWorksTexts";
import LinesAndCircles from "./componentsAndHandlers/LinesAndCircles";
import Step1 from "@/public/Step1.webp";
import Step2 from "@/public/Step2.webp";
import Step3 from "@/public/Step3.webp";
import style from "./HowItWork.module.scss";

const HowItWork = () => {
  return (
    <article className={style.howItWork} id="howItWorks">
      <section>
        <h1>HOW DOES IT WORK?</h1>
        <h2>Make a cool look in 3 easy steps</h2>
      </section>
      <section className={style.howItWork__contentBlock}>
        <section className={style.howItWork__section}>
          <div className={style.howItWork__textBlock}>
            <h2>{texts[0].title}</h2>
            <p>{texts[0].content}</p>
          </div>
          <LinesAndCircles />
          <Image
            src={Step1}
            alt="how it work step"
            className={style.howItWork__imgBlock}
            placeholder="blur"
          />
        </section>
        <section className={style.howItWork__section}>
          <div className={style.howItWork__textBlock}>
            <h2>{texts[1].title}</h2>
            <p>{texts[1].content}</p>
          </div>
          <Image
            src={Step2}
            alt="how it work step"
            className={style.howItWork__imgBlock}
            placeholder="blur"
          />
        </section>
        <section className={style.howItWork__section}>
          <div className={style.howItWork__textBlock}>
            <h2>{texts[2].title}</h2>
            <p>{texts[2].content}</p>
          </div>
          <Image
            src={Step3}
            alt="how it work step"
            className={style.howItWork__imgBlock}
            placeholder="blur"
          />
        </section>
      </section>
    </article>
  );
};

export default HowItWork;
