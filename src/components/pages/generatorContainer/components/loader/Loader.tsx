import Image from "next/image";
import Loading from "@/public/Рубашка_белая.json";
import Lottie from "lottie-react";

import style from "./Loader.module.scss";
import { useState, useEffect } from "react";
import Typography from "@/components/ui/typography/Typography";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    var animaTime = 120; // Время анимации в секундах
    var FPS = 10; // "кадры" (вызовы функции) в секунду

    var count = 0;
    var limit = 95;

    var updateRate = 1000 / FPS;
    var updateStep = limit / FPS / animaTime;

    const animaProgress = () => {
      if (count >= limit) {
        clearInterval(interval);
        return;
      }

      count += updateStep;
      setProgress(Math.round(count));
    };

    var interval = setInterval(animaProgress, updateRate);
  }, []);

  return (
    <div className={style.loader}>
      <div className={style.loader__content}>
        <Lottie
          animationData={Loading}
          loop={true}
          className={style.loader__image}
        />
        <Typography variant="h2" className={style.loader__progress}>{progress}%</Typography>
      </div>
    </div>
  );
}
