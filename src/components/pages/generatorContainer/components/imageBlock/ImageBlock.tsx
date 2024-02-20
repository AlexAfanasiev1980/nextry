import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image, { StaticImageData } from "next/image";
import style from "./ImageBlock.module.scss";
import CustomBorder from "@/components/ui/customBorder/CustomBorder";
import LGBorder from "@/components/ui/lGBorder/LGBorder";
import Button from "@/components/ui/button/Button";
import { FileData } from "../../GeneratorContainer";
import Loader from "../loader/Loader";
import GeneratedImage from "../generatedImage/GeneratedImage";

const ImageBlock = ({
  statusSelector,
  selectedImage,
  setSelectedImage,
  image,
  setImage,
  loading,
  icon
}: {
  statusSelector?: boolean;
  selectedImage: FileData[];
  setSelectedImage: Dispatch<SetStateAction<FileData[]>>;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  icon: StaticImageData;
}) => {
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
          <div className={style.dropImageBlock__imageWrapper}>
            <Image
              src={selectedImage[0]?.preview}
              alt="selected image"
              width={620}
              height={960}
              className={style.dropImage}
            />
          </div>
        </section>
      </LGBorder>
    );
  };

  const stylesBorder = {
    padding: "1px",
    colorTop: "rgba(250, 250, 250, 0.27)",
    colorBottom: "rgba(250,250,250, 0)",
    borderRadius: "16px",
  };

  return (
    <>
      {!loading && !image && selectedImage.length > 0 && <SelectedImage />}
      {!loading && image && (
        <GeneratedImage image={image} setImage={setImage} />
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

      {!loading && selectedImage.length === 0 && (
        <form className={style.dropImageBlock__form}>
          <CustomBorder />
          <div className={style.dropImageBlock__wrapper} {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={style.dropImageBlock}>
              <Image src={icon} alt="drop icon" />
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
