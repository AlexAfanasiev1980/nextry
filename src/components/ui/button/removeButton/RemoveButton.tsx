import Image from "next/image";
import style from "./removeButton.module.scss";
import DeleteIcon from "@/public/deleteIcon.png";

interface IRemoveButton {
  onClick?: () => void;
  className?: string;
}

export default function RemoveButton({ onClick, className }: IRemoveButton) {
  return (
    <button
      type="button"
      className={[style.button, className && className].join(" ")}
      onClick={onClick}
    >
      <Image src={DeleteIcon} alt="move back img" />
    </button>
  );
}
