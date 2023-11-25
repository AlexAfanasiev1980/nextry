"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import cookie from "js-cookie";
import Image from "next/image";
import DropIcon from "@/public/DropImageIcon.svg";
import DeleteIcon from "@/public/deleteIcon.png";
import DownloadIcon from "@/public/downloadIcon.png";
import ArrowForward from "@/public/ArrowForward.png";
import ArrowBack from "@/public/ArrowBack.png";
import style from "./ImageBlock.module.scss";
import { getPhoto } from "@/lib/data";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";

interface FileData extends File {
  preview: string;
}

const server = process.env.NEXT_PUBLIC_BASE_URL;

const ImageBlock = ({
  statusSelector,
  id,
}: {
  statusSelector: boolean;
  id: string | null;
}) => {
  const [selectedImage, setSelectedImage] = useState<FileData[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [urlDown, setUrlDown] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage([
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
    ]);
  }, []);

  const handleButton = async () => {
    setLoading(true);
    const token = await cookie.get("OutSiteJWT");
    if (!token) {
      alert("Авторизуйтесь перед использованием генератора!");
      router.push("/");
    } else {
      try {
        const form = new FormData();
        form.append("Image", selectedImage[0]);
        form.append("Id", id || "");
        const res = await getPhoto(form, token);
        if (res) {
          setImage(`${server}${res.images[0]}`);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    maxSize: 52428800,
  });

  const SelectedImage = () => {
    return (
      <section
        className={`${!loading && style.dropImageBlock__filled} ${
          loading && style.dropImageBlock__displayNone
        }`}
      >
        {!image ? <RemoveButton /> : <BackButton />}
        <div className={style.dropImageBlock__imageWrapper}>
          <Image
            src={image ? image : selectedImage[0]?.preview}
            alt="selected image"
            width={620}
            height={960}
            className={style.dropImage}
            ref={imageRef}
          />
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
        <div className={style.buttonBlock}>
          <DownloadButton />
          <GenerateButton />
        </div>
      </section>
    );
  };

  const RemoveButton = () => {
    return (
      <button
        className={style.removeBtn}
        onClick={() => {
          URL.revokeObjectURL(selectedImage[0]?.preview);
          setImage(null);
          setSelectedImage([]);
        }}
      >
        <Image src={DeleteIcon} alt="remove button" />
      </button>
    );
  };

  const BackButton = () => {
    return (
      <button
        className={style.removeBtn}
        onClick={() => {
          setImage(null);
        }}
      >
        <Image src={ArrowBack} alt="remove button" />
      </button>
    );
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = url;
      link.click();
    }
  };

  const DownloadButton = () => {
    return (
      <button
        className={`${style.downloadBtn} ${image && style.generateBtn__active}`}
        onClick={() => downloadImage()}
      >
        <Image src={DownloadIcon} alt="download button" />
      </button>
    );
  };

  const GenerateButton = () => {
    return (
      <button
        className={[
          style.generateBtn,
          statusSelector && style.generateBtn__active,
        ].join(" ")}
        disabled={!statusSelector}
        onClick={() => handleButton()}
      >
        GENERATE IMAGE
        <Image src={ArrowForward} alt="generate icon" />
      </button>
    );
  };

  useEffect(() => {
    const imageItem = imageRef.current;
    const canvas = canvasRef.current;
    if (imageItem && canvas) {
      imageItem.onload = () => {
        canvas.width = imageItem.naturalWidth;
        canvas.height = imageItem.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(imageItem, 0, 0);
        }
      };
    }
  }, [image]);

  return (
    <>
      {selectedImage.length > 0 && <SelectedImage />}
      {loading && <Loader />}
      {selectedImage.length === 0 && (
        <form className={style.dropImageBlock__form}>
          <div className={style.dropImageBlock__wrapper} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={style.dropImageBlock}>
              <Image src={DropIcon} alt="drop icon" />
              <p className={style.dropImageBlock__text}>
                DROP YOUR IMAGES, <span>BROWSE</span>
              </p>
              <p>JPG, PNG, WebP up to 50 mb</p>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ImageBlock;
