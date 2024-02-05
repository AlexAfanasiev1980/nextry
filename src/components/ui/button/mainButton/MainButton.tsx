import style from "./mainButton.module.scss";
import Typography from "../../typography/Typography";
import BorderButton from "../borderButton/BorderButton";

interface IMainButton {
  onClick?: () => void;
  className?: string;
  border?: boolean;
  children?: React.ReactNode | string;
  disabled?: boolean;
}

export default function MainButton({
  onClick,
  className,
  border,
  children,
  disabled = false,
}: IMainButton) {
  return (
    <BorderButton className={className} border={border} disabled={disabled}>
      <button
        type="button"
        className={`${style.mainButton} ${border && style.mainButton__border} ${
          disabled && style.mainButton__disabled
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        <Typography variant={"subtitle"} className={style.mainButton__text}>
          {children}
        </Typography>
      </button>
    </BorderButton>
  );
}
