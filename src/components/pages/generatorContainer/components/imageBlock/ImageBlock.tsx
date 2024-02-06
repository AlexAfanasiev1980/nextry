import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import DropIcon from "@/public/DropDownImage_1.png";
import style from "./ImageBlock.module.scss";
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

  return (
    <>
      {selectedImage.length > 0 && <SelectedImage />}
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
