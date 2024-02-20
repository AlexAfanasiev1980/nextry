'use client'

import GeneratorWrapper from "@/components/generatorWrapper/GeneratorWrapper";
import { FileData } from "../generatorContainer/GeneratorContainer";
import style from "./fancyClothes.module.scss";
import { useState } from "react";
import ImageBlock from "../generatorContainer/components/imageBlock/ImageBlock";
import DropIcon from "@/public/DropDownImage_1.png";
import LGBorder from "@/components/ui/lGBorder/LGBorder";
import Typography from "@/components/ui/typography/Typography";

export default function FancyClothesPage() {
  const [selectedImage, setSelectedImage] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleButton = () => {
    console.log("Запуск");
  };

  const stylesBorder = {
    padding: "1px",
    colorTop: "rgba(250, 250, 250, 0.27)",
    colorBottom: "rgba(250,250,250, 0)",
    borderRadius: "16px",
  };

  return (
    <GeneratorWrapper
      title={"Fancy clothes"}
      onClick={handleButton}
      disabled={selectedImage.length === 0}
      icon={image ? "repeat" : "generate"}
    >
      <>
        <div className={style.generator}>
          <ImageBlock
            selectedImage={selectedImage}
            image={image}
            setSelectedImage={setSelectedImage}
            setImage={setImage}
            loading={loading}
            icon={DropIcon}
          />
          <LGBorder
            styles={stylesBorder}
            className={style.generator__wrapperSlider}
          >
            <div className={style.generator__settings}>
              <Typography variant="h3">Select template</Typography>
              {/* <div className={style.generator__skin}>
                <Typography variant="p1">Clear Skin Slider</Typography>
                <Slider
                  values={VALUES_SKIN}
                  onClick={(type: string) => setSkin(type)}
                  position={positionSkin}
                />
              </div>
              <div className={style.generator__skin}>
                <Typography variant="p1">Skin detail</Typography>
                <Slider
                  values={VALUES_SKIN_DETAIL}
                  onClick={(type: string) => setSkinDetail(type)}
                  position={positionSkinDetail}
                />
              </div> */}
            </div>
          </LGBorder>
        </div>
      </>
    </GeneratorWrapper>
  );
}
