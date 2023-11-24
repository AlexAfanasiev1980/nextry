import Image from "next/image";
import AboutGif from "@/public/GIF_ABOUT_SECTION.gif";
import style from "../About.module.scss";

const ImgSection = () => {
  return (
    <section className={style.about__imgBlock}>
      <Image src={AboutGif} alt="about company img" />
    </section>
  );
};

export default ImgSection;
