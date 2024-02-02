import { Dispatch, SetStateAction } from "react";
import style from "./mainButton.module.scss";
import Typography from "../../typography/Typography";

interface IMainButton {
  onClick?: () => void;
  className?: string;
  border?: boolean;
  children?: string;
}

export default function MainButton({
  onClick,
  className,
  border,
  children,
}: IMainButton) {
  return (
    <button
      type="button"
      className={`${style.mainButton} ${border && style.mainButton__border} ${
        className && className
      }`}
      onClick={onClick}
    >
      <div
        className={`${style.mainButton__background} ${
          border && style.mainButton__background_border
        }`}
      >
        <Typography variant={"subtitle"} className={style.mainButton__text}>
          {children}
        </Typography>
      </div>
    </button>
  );
}
