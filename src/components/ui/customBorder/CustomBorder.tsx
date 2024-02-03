import style from './customBorder.module.scss';

export default function CustomBorder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className={style.border}
    >
      <rect
        x="0"
        y="0"
        rx="20"
        width="100%"
        height="100%"
        className={style.borderRect}
      />
    </svg>
  );
}
