import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import DropIcon from "@/public/DropDownImage_1.png";
import DownloadIcon from "@/public/downloadIcon.png";
import ArrowBack from "@/public/ArrowBack.png";
import style from "./ImageBlock.module.scss";
import Loader from "../loader/Loader";
import CustomBorder from "@/components/ui/customBorder/CustomBorder";
import LGBorder from "@/components/ui/lGBorder/LGBorder";
import Button from "@/components/ui/button/Button";
import { FileData } from "../../GeneratorContainer";

const ImageBlock = ({
  statusSelector,
  selectedImage,
  setSelectedImage,
  image,
  setImage,
  loading,
}: {
  statusSelector: boolean;
  selectedImage: FileData[];
  setSelectedImage: Dispatch<SetStateAction<FileData[]>>;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
}) => {
  const [fast, setFast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage([
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
    ]);
  }, []);

  const handleClickRemove = () => {
    URL.revokeObjectURL(selectedImage[0]?.preview);
    setImage(null);
    setSelectedImage([]);
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
      <LGBorder styles={styles} className={style.dropImageBlock__wrapperImage}>
        <section
          className={`${!loading && style.dropImageBlock__filled} ${
            loading && style.dropImageBlock__displayNone
          }`}
        >
          <div className={style.removeButton}>
            {" "}
            <Button type="remove" onClick={handleClickRemove} />
          </div>

          {/* <RemoveButton /> */}
          {/* {!image ? <RemoveButton /> : <BackButton />} */}
          {/* {!back && <FastButton />} */}
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
          {/* <div className={style.buttonBlock}> */}
          {/* <DownloadButton /> */}
          {/* <GenerateButton /> */}
          {/* </div> */}
        </section>
      </LGBorder>
    );
  };

  // const RemoveButton = () => {
  //   return (
  //     <button
  //       className={style.removeBtn}
  //       onClick={() => {
  //         URL.revokeObjectURL(selectedImage[0]?.preview);
  //         setImage(null);
  //         setSelectedImage([]);
  //       }}
  //     >
  //       <Image src={DeleteIcon} alt="remove button" />
  //     </button>
  //   );
  // };

  // const BackButton = () => {
  //   return (
  //     <button
  //       className={style.removeBtn}
  //       onClick={() => {
  //         setImage(null);
  //       }}
  //     >
  //       <Image src={ArrowBack} alt="remove button" />
  //     </button>
  //   );
  // };

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

  // const GenerateButton = () => {
  //   return (
  //     <button
  //       className={[
  //         style.generateBtn,
  //         statusSelector && style.generateBtn__active,
  //       ].join(" ")}
  //       disabled={!statusSelector}
  //       onClick={() => handleButton()}
  //     >
  //       GENERATE IMAGE
  //       <Image src={ArrowForward} alt="generate icon" />
  //     </button>
  //   );
  // };

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
      {/* {loading && <Loader />} */}
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
