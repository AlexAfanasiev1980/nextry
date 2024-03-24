"use client";

import GeneratorWrapper from "@/components/generatorWrapper/GeneratorWrapper";
import { FileData } from "../generatorContainer/GeneratorContainer";
import style from "./funnyClothes.module.scss";
import { useState } from "react";
import ImageBlock from "../generatorContainer/components/imageBlock/ImageBlock";
import DropIcon from "@/public/DropDownImage_1.png";
import LGBorder from "@/components/ui/lGBorder/LGBorder";
import Typography from "@/components/ui/typography/Typography";
import cookie from "js-cookie";
import { ITemplate } from "@/app/(tools)/generator/funny-clothes/page";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GENERATE_FUNNY } from "@/api";
import { getPhoto } from "@/lib/data";

const server = process.env.NEXT_PUBLIC_BASE_URL;

export default function FancyClothesPage({
  template,
}: {
  template: ITemplate[];
}) {
  const [selectedImage, setSelectedImage] = useState<FileData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [linkImage, setLinkImage] = useState<null | string>(null);
  const router = useRouter();

  const handleButton = async () => {
    const token = await cookie.get("OutSiteJWT");
    if (!token) {
      alert("Login before using the generator!");
      router.push("/");
    } else if (selectedId && selectedImage.length !== 0) {
      setLoading(true);
      try {
        const form = new FormData();
        form.append("Image", selectedImage[0]);
        form.append("Id", selectedId);
        let res = await getPhoto(GENERATE_FUNNY, form, token);
        if (res) {
          setImage(`${server}${res.preview_image}`);
          setLinkImage(`${server}${res.stock_image}`);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
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
      title={"Funny clothes"}
      onClick={handleButton}
      disabled={selectedImage.length === 0 || !selectedId || loading}
      icon={image ? "repeat" : "generate"}
    >
      <>
        <div className={style.generator}>
          <ImageBlock
            selectedImage={selectedImage}
            image={image}
            setSelectedImage={setSelectedImage}
            setImage={setImage}
            setLinkImage={setLinkImage}
            linkImage={linkImage}
            loading={loading}
            icon={DropIcon}
          />
          <LGBorder
            styles={stylesBorder}
            className={style.generator__wrapperSlider}
          >
            <div className={style.generator__settings}>
              <Typography variant="h3">Select template</Typography>
              <ul className={style.generator__listImage}>
                {template &&
                  template.map((el: ITemplate, index) => {
                    return (
                      <li
                        key={index}
                        className={[
                          style.generator__item,
                          selectedId && el.id !== selectedId
                            ? style.generator__itemSelected
                            : "",
                        ].join(" ")}
                        onClick={() => setSelectedId(el.id)}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${el.preview_url}`}
                          width={144}
                          height={144}
                          alt="image"
                          className={style.generator__itemImage}
                        />
                      </li>
                    );
                  })}
              </ul>

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
