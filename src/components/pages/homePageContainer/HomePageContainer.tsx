"use client";

import About from "./components/about/About";
import Comparison from "./components/comparison/Comparison";
import HowItWork from "./components/howItWork/HowItWorks";
import FAQ from "./components/faq/FAQ";
import Contact from "./components/contact/Contact";
import style from "./HomePageContainer.module.scss";
import { useEffect } from "react";
import { createRequest } from "@/lib/data";
import { GET_PING } from "@/api";
import { useRouter } from "next/navigation";

export interface IPing {
  message: string
}

const HomePageMain = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function work() {
      const work: IPing | any = await createRequest(GET_PING);
      if (!work.message || work.message !== "pong") {
        router.push("/error");
      }
    }
    work();
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
