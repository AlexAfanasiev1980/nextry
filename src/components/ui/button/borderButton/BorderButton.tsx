import style from "./borderButton.module.scss";

interface IBorderButton {
  className?: string;
  border?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function BorderButton({
  className,
  border = false,
  disabled = false,
  children,
}: IBorderButton) {
  return (
    <div
      className={`${style.border} ${border && style.border__circle} ${
        className && className
      } ${disabled && style.border__disabled}`}
    >
      {children}
    </div>
  );
}
