
import style from "./slider.module.scss";
import Image from "next/image";
import DecreaseIcon from "@/public/decreaseIcon.png";
import IncreaseIcon from "@/public/increaseIcon.png";
import Button from "@/components/ui/button/Button";

interface ISlider {
  values: number[];
  onClick: (type: string) => void;
  position: number;
}

export default function Slider({ values, onClick,  position}: ISlider) {
  return (
    <div className={style.slider}>
      <div className={style.slider__decrease}>
        <Button type="button" onClick={() => onClick("decrease")}>
          <Image src={DecreaseIcon} alt="decrease" />
        </Button>
      </div>
      <div className={style.slider__scale}>
        {values.map((id: number) => (
          <div
            key={id}
            className={[
              style.slider__slide,
              id <= position && style.slider__slide_active,
            ].join(" ")}
          ></div>
        ))}
      </div>
      <div className={style.slider__increase}>
        <Button type="button" onClick={() => onClick("increase")}>
          <Image src={IncreaseIcon} alt="increase" />
        </Button>
      </div>
    </div>
  );
}
