import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import cookie from "js-cookie";
import Image from "next/image";
import DropIcon from "@/public/DropDownImage_1.png";
import DeleteIcon from "@/public/deleteIcon.png";
import DownloadIcon from "@/public/downloadIcon.png";
import ArrowForward from "@/public/ArrowForward.png";
import ArrowBack from "@/public/ArrowBack.png";
import style from "./ImageBlock.module.scss";
import { getPhoto } from "@/lib/data";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { GENERATE_BACKGROUND, GENERATE_IMAGE } from "@/api";
import CustomBorder from "@/components/ui/customBorder/CustomBorder";
import LGBorder from "@/components/ui/lGBorder/LGBorder";

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
  const [fast, setFast] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pathname = usePathname();
  const back = pathname.includes("background");

  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage([
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
    ]);
  }, []);

  const handleButton = async () => {
    const token = await cookie.get("OutSiteJWT");
    if (!token) {
      alert("Login before using the generator!");
      router.push("/");
    } else if (id) {
      if (!back) {
        setLoading(true);
        try {
          const form = new FormData();
          form.append("Image", selectedImage[0]);
          form.append("Id", id);
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
            form.append("Id", id);
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
    const styles = {
      padding: "1px",
      colorTop: "rgba(250, 250, 250, 0.27)",
      colorBottom: "rgba(250,250,250, 0)",
      borderRadius: "16px",
    };

    return (
      <LGBorder styles={styles}>
        <section
          className={`${!loading && style.dropImageBlock__filled} ${
            loading && style.dropImageBlock__displayNone
          }`}
        >
          {!image ? <RemoveButton /> : <BackButton />}
          {!back && <FastButton />}
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
      </LGBorder>
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
          <CustomBorder />
          <div className={style.dropImageBlock__wrapper} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={style.dropImageBlock}>
              <Image src={DropIcon} alt="drop icon" />
              <p className={style.dropImageBlock__text}>
                Drop person images, <span>browse</span>
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
