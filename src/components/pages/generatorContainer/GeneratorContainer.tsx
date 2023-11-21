"use client";

import { useState } from "react";
import ClothSelectorBlock from "./components/clothSelectorBlock/ClothSelectorBlock";
import ImageBlock from "./components/imageBlock/ImageBlock";
import style from "./GeneratorContainer.module.scss";
import { Categories, Clothes } from "@/lib/data";

interface Props {
  data?: {
    categories: Categories[];
    clothes: Clothes[];
  };
}

const GeneratorContainer = (props: Props) => {
  const [statusSelector, setStatusSelector] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);

  return (
    <main className={style.generator}>
      <ImageBlock statusSelector={statusSelector} id={selectId}/>
      <ClothSelectorBlock
        setStatusSelector={setStatusSelector}
        setSelectId={setSelectId}
        data={props.data}
      />
    </main>
  );
};

export default GeneratorContainer;
