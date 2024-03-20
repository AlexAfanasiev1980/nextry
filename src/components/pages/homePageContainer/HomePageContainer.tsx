'use client'

import About from "./components/about/About";
import Comparison from "./components/comparison/Comparison";
import HowItWork from "./components/howItWork/HowItWorks";
import FAQ from "./components/faq/FAQ";
import Contact from "./components/contact/Contact";
import style from "./HomePageContainer.module.scss";
import { revalidatePath } from "next/cache";
import { useEffect } from "react";

const HomePageMain = () => {
  // revalidatePath("/", "layout");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={style.homePageContainer}>
      <About />
      <Comparison />
      <HowItWork />
      <FAQ />
      <Contact />
    </main>
  );
};

export default HomePageMain;
