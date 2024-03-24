"use client";

import GeneratorWrapper from "@/components/generatorWrapper/GeneratorWrapper";
import { FileData } from "../generatorContainer/GeneratorContainer";
import { useState } from "react";
import DropIcon from "@/public/DropDownImage_1.png";
import FashionIcon from "@/public/DropDownImage_2.png";
import style from "./fashionSwapPage.module.scss";
import { useRouter } from "next/navigation";
import ImageBlock from "../generatorContainer/components/imageBlock/ImageBlock";
import cookie from "js-cookie";
import { GENERATE_FASHION_SWAP } from "@/api";
import { getPhoto } from "@/lib/data";

const server = process.env.NEXT_PUBLIC_BASE_URL;

export default function FashionSwapPage() {
  const [selectedImage, setSelectedImage] = useState<FileData[]>([]);
  const [selectedFashionImage, setSelectedFashionImage] = useState<FileData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [linkImage, setLinkImage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const handleButton = async () => {
    const token = await cookie.get("OutSiteJWT");
    if (!token) {
      alert("Login before using the generator!");
      router.push("/");
    } else if (selectedFashionImage.length !== 0 && selectedImage.length !== 0) {
      setLoading(true);
      try {
        const form = new FormData();
        form.append("PersonImage", selectedImage[0]);
        form.append("ClothesImage", selectedFashionImage[0]);
        let res = await getPhoto(GENERATE_FASHION_SWAP, form, token);

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

  return (
    <GeneratorWrapper
      title={"FashionSwap"}
      onClick={handleButton}
      disabled={selectedImage.length === 0 || selectedFashionImage.length === 0 || loading}
      icon={image ? "repeat" : "generate"}
    >
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
        <ImageBlock
          selectedImage={selectedFashionImage}
          image={null}
          setSelectedImage={setSelectedFashionImage}
          loading={false}
          icon={FashionIcon}
        />
      </div>
    </GeneratorWrapper>
  );
}
