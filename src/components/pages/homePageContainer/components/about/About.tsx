import TextSection from "./components/TextSection";
import ImgSection from "./components/ImgSection";
import style from "./About.module.scss";
import { Suspense } from "react";

const About = () => {
  return (
    <article className={style.about} id="about">
      <TextSection />
      <Suspense fallback={<div></div>}>
        <ImgSection />
      </Suspense>
    </article>
  );
};

export default About;
