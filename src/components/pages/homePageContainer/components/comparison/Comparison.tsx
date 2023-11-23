"use client";

import { ReactCompareSlider } from "react-compare-slider";
import Image from "next/image";
import beforeImg from "@/public/before.webp";
import afterImg from "@/public/after.webp";
import style from "./Comparison.module.scss";

const Comparison = () => {
  return (
    <article className={style.comparison}>
      <ReactCompareSlider
        itemOne={<Image src={beforeImg} alt="ai-generator-example-before" />}
        itemTwo={<Image src={afterImg} alt="ai-generator-example-after" />}
      />
      {/* <div className={style.patch}></div> */}
    </article>
  );
};

export default Comparison;
