import About from "./components/about/About";
import Comparison from "./components/comparison/Comparison";
import HowItWork from "./components/howItWork/HowItWorks";
import FAQ from "./components/faq/FAQ";
import Contact from "./components/contact/Contact";
import style from "./HomePageContainer.module.scss";
import { revalidatePath } from "next/cache";

const HomePageMain = () => {
  revalidatePath("/", "layout");
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
