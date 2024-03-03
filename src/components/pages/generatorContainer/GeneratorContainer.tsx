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
import GeneratorWrapper from "@/components/generatorWrapper/GeneratorWrapper";
import DropIcon from "@/public/DropDownImage_1.png";

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

const typePage: {
  [key: string]: {
    title: string;
    selectorTitle: string;
  };
} = {
  "/generator/fitting-room": {
    title: "Virtual fitting room",
    selectorTitle: "Select a clothes",
  },
  "/generator/background": {
    title: "Change background",
    selectorTitle: "Select a background",
  },
  "/generator/face-swap": {
    title: "Animal face swap",
    selectorTitle: "",
  },
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
            console.log(res.images[0])
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
  // const FastButton = () => {
  //   return (
  //     <button
  //       className={`${style.fastBtn} ${fast && style.fastBtn__active}`}
  //       onClick={() => {
  //         setFast(!fast);
  //       }}
  //     >
  //       FAST
  //     </button>
  //   );
  // };

  const title: string = useMemo(() => {
    return typePage[pathname].title;
  }, [pathname]);

  return (
    <GeneratorWrapper
      title={title}
      onClick={handleButton}
      disabled={selectId === null || selectedImage.length === 0 || loading}
      icon={image ? "repeat" : "generate"}
    >
      <>
        <div className={style.generator}>
          <ImageBlock
            statusSelector={statusSelector}
            selectedImage={selectedImage}
            image={image}
            setSelectedImage={setSelectedImage}
            setImage={setImage}
            loading={loading}
            icon={DropIcon}
          />
          <ClothSelectorBlock
            setStatusSelector={setStatusSelector}
            setSelectId={setSelectId}
            selectId={selectId}
            selectorTitle={typePage[pathname].selectorTitle}
            data={props.data}
          />
        </div>
      </>
    </GeneratorWrapper>
  );
};

export default GeneratorContainer;
