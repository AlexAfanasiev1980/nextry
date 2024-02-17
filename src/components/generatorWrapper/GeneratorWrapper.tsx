import style from "./generatorWrapper.module.scss";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import MagicWand from "@/public/MagicWand.svg";
import RepeatIcon from "@/public/repeat.svg";

interface IGeneratorWrapper {
  title: string;
  onClick: () => void;
  disabled: boolean;
  icon: "repeat" | "generate";
  children: React.ReactNode;
}

const GeneratorWrapper = ({
  title,
  onClick,
  disabled,
  icon,
  children,
}: IGeneratorWrapper) => {

  return (
    <main className={style.generatorWrapper}>
      <h1 className={style.generatorWrapper__title}>{title}</h1>
      <div className={style.generatorWrapper__content}>
        {children}
        <div className={style.generatorWrapper__button}>
          <Button type="button" disabled={disabled} onClick={onClick}>
            <Image
              src={icon === "repeat" ? RepeatIcon : MagicWand}
              alt="icon"
            />
            {icon === "repeat" ? "Process again" : "Process the image"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default GeneratorWrapper;
