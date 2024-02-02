"use client";

import { useState, useMemo } from "react";
import ClothSelectorBlock from "./components/clothSelectorBlock/ClothSelectorBlock";
import ImageBlock from "./components/imageBlock/ImageBlock";
import style from "./GeneratorContainer.module.scss";
import { Categories, Clothes } from "@/lib/data";
import { usePathname } from "next/navigation";

interface Props {
  data: {
    categories?: Categories[];
    clothes: Clothes[] | any;
  };
}

const typePage: { [key: string]: string } = {
  "/generator/fitting-room": "Virtual fitting room",
  "/generator/background": "Change background",
  "/generator/face-swap": "Animal face swap",
};

const GeneratorContainer = (props: Props) => {
  const [statusSelector, setStatusSelector] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);
  const pathname = usePathname();

  const title: string = useMemo(() => {
    return typePage[pathname];
  }, [pathname]);

  return (
    <main>
      <h1 className={style.title}>{title}</h1>
      <div className={style.generator}>
        <ImageBlock statusSelector={statusSelector} id={selectId} />
        <ClothSelectorBlock
          setStatusSelector={setStatusSelector}
          setSelectId={setSelectId}
          data={props.data}
        />
      </div>
    </main>
  );
};

export default GeneratorContainer;
