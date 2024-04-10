import Image from "next/image";
import Loading from "@/public/Рубашка_белая.json";
import Lottie from "lottie-react";

import style from "./Loader.module.scss";
import { useState, useEffect } from "react";
import Typography from "@/components/ui/typography/Typography";
import { handlerTime } from "@/lib/time";

export default function Loader({time}: {time?: number | null}) {
  const [progress, setProgress] = useState(0);
  const timeRun: string | null = time ? handlerTime(time) : null;

  useEffect(() => {
    var animaTime = time ? time : 120; // Время анимации в секундах
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Typography variant="p2" className={style.loader__progress}>{timeRun ? `approximate generation time ${timeRun}` : ""}</Typography>
      </div>
    </div>
  );
}
