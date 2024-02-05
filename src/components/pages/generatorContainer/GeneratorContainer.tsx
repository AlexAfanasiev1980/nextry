"use client";

import { useState, useMemo } from "react";
import ClothSelectorBlock from "./components/clothSelectorBlock/ClothSelectorBlock";
import ImageBlock from "./components/imageBlock/ImageBlock";
import style from "./GeneratorContainer.module.scss";
import { Categories, Clothes } from "@/lib/data";
import cookie from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { GENERATE_BACKGROUND, GENERATE_IMAGE } from "@/api";
import { getPhoto } from "@/lib/data";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import MagicWand from "@/public/MagicWand.svg";
import Loader from "./components/loader/Loader";
import GeneratedImage from "./components/generatedImage/GeneratedImage";
import LGBorder from "@/components/ui/lGBorder/LGBorder";

const server = process.env.NEXT_PUBLIC_BASE_URL;

export interface FileData extends File {
  preview: string;
}

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
  const [selectedImage, setSelectedImage] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [fast, setFast] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const back = pathname.includes("background");
  // console.log(props.data.clothes)

  const handleButton = async () => {
    const token = await cookie.get("OutSiteJWT");
    if (!token) {
      alert("Login before using the generator!");
      router.push("/");
    } else if (selectId) {
      if (!back) {
        setLoading(true);
        try {
          const form = new FormData();
          form.append("Image", selectedImage[0]);
          form.append("Id", selectId);
          let res: any;
          if (fast) {
            const params = new URLSearchParams();
            params.append("gen_type", "FAST");
            res = await getPhoto(GENERATE_IMAGE, form, token, params);
          } else if (!back) {
            res = await getPhoto(GENERATE_IMAGE, form, token);
          }

          if (res) {
            setImage(`${server}${res.images[0]}`);
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      } else {
        if (back) {
          setLoading(true);
          try {
            const form = new FormData();
            form.append("Image", selectedImage[0]);
            form.append("Id", selectId);
            const res = await getPhoto(GENERATE_BACKGROUND, form, token);
            if (res) {
              setImage(`${server}${res.images[0]}`);
              setLoading(false);
            }
          } catch (err) {
            console.error(err);
            setLoading(false);
          }
        }
      }
    }
  };

  // пока в макете нет этой кнопки, нужно согласование о необходимости ее добавления
  const FastButton = () => {
    return (
      <button
        className={`${style.fastBtn} ${fast && style.fastBtn__active}`}
        onClick={() => {
          setFast(!fast);
        }}
      >
        FAST
      </button>
    );
  };

  const title: string = useMemo(() => {
    return typePage[pathname];
  }, [pathname]);

  const stylesBorder = {
    padding: "1px",
    colorTop: "rgba(250, 250, 250, 0.27)",
    colorBottom: "rgba(250,250,250, 0)",
    borderRadius: "16px",
  };

  return (
    <main className={style.content}>
      <h1 className={style.title}>{title}</h1>
      <div className={style.generatorWrapper}>
        {!loading && !image && (
          <>
            <div className={style.generator}>
              <ImageBlock
                statusSelector={statusSelector}
                selectedImage={selectedImage}
                image={image}
                setSelectedImage={setSelectedImage}
                setImage={setImage}
                loading={loading}
              />
              <ClothSelectorBlock
                setStatusSelector={setStatusSelector}
                setSelectId={setSelectId}
                selectId={selectId}
                data={props.data}
              />
            </div>
            <div className={style.button}>
              <Button
                type="button"
                disabled={selectId === null || selectedImage.length === 0}
                onClick={handleButton}
              >
                <Image src={MagicWand} alt="icon" />
                Process the image
              </Button>
            </div>
          </>
        )}
        {loading && (
          <div className={style.loaderWrapper}>
            <LGBorder styles={stylesBorder}>
              <div className={style.loader}>
                <Loader />
              </div>
            </LGBorder>
          </div>
        )}
        {!loading && image && (
          <GeneratedImage image={image} setImage={setImage} />
        )}
      </div>
    </main>
  );
};

export default GeneratorContainer;
