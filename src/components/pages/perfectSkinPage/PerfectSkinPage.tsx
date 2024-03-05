"use client";

import GeneratorWrapper from "@/components/generatorWrapper/GeneratorWrapper";
import { useState } from "react";
import { FileData } from "../generatorContainer/GeneratorContainer";
import ImageBlock from "../generatorContainer/components/imageBlock/ImageBlock";
import FaceIcon from "@/public/faceIcon.png";
import style from "./perfectSkinPage.module.scss";
import LGBorder from "@/components/ui/lGBorder/LGBorder";
import Typography from "@/components/ui/typography/Typography";
import cookie from "js-cookie";
import Slider from "@/components/ui/slider/Slider";
import { useRouter } from "next/navigation";
import { GENERATE_FACE } from "@/api";
import { getPhoto } from "@/lib/data";

const VALUES_SKIN = [1, 2, 3];
const VALUES_SKIN_DETAIL = [7, 9, 11, 13, 15];
const server = process.env.NEXT_PUBLIC_BASE_URL;

export default function PerfectSkinPage() {
  const [statusSelector, setStatusSelector] = useState(false);
  const [selectedImage, setSelectedImage] = useState<FileData[]>([]);
  const [positionSkin, setPositionSkin] = useState(1);
  const [positionSkinDetail, setPositionSkinDetail] = useState(7);
  const [linkImage, setLinkImage] = useState<null | string>(null)
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleButton = async () => {
    const token = await cookie.get("OutSiteJWT");
    if (!token) {
      alert("Login before using the generator!");
      router.push("/");
    } else if (selectedImage) {
      setLoading(true);
      try {
        const form = new FormData();
        form.append("Image", selectedImage[0]);
        form.append("Steps", String(positionSkin));
        form.append("Cycle", String(positionSkinDetail));
        const res = await getPhoto(GENERATE_FACE, form, token);
        if (res) {
          setImage(`${server}${res.preview_image}`);
          setLinkImage(`${server}${res.stock_image}`);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const setSkin = (type: string) => {
    switch (type) {
      case "decrease":
        if (positionSkin > 1) {
          setPositionSkin((prev) => prev - 1);
        }
        break;
      case "increase":
        if (positionSkin < 3) {
          setPositionSkin((prev) => prev + 1);
        }
    }
  };

  const setSkinDetail = (type: string) => {
    switch (type) {
      case "decrease":
        if (positionSkinDetail > 7) {
          setPositionSkinDetail((prev) => prev - 2);
        }
        break;
      case "increase":
        if (positionSkinDetail < 15) {
          setPositionSkinDetail((prev) => prev + 2);
        }
    }
  };

  const stylesBorder = {
    padding: "1px",
    colorTop: "rgba(250, 250, 250, 0.27)",
    colorBottom: "rgba(250,250,250, 0)",
    borderRadius: "16px",
  };

  return (
    <GeneratorWrapper
      title={"PerfectSkin"}
      onClick={handleButton}
      disabled={selectedImage.length === 0}
      icon={image ? "repeat" : "generate"}
    >
      <>
        <div className={style.generator}>
          <ImageBlock
            statusSelector={statusSelector}
            selectedImage={selectedImage}
            image={image}
            setSelectedImage={setSelectedImage}
            setLinkImage={setLinkImage}
            setImage={setImage}
            linkImage = {linkImage}
            loading={loading}
            icon={FaceIcon}
          />
          <LGBorder
            styles={stylesBorder}
            className={style.generator__wrapperSlider}
          >
            <div className={style.generator__settings}>
              <Typography variant="h3">Image Processing Settings</Typography>
              <div className={style.generator__skin}>
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
              </div>
            </div>
          </LGBorder>
        </div>
      </>
    </GeneratorWrapper>
  );
}
