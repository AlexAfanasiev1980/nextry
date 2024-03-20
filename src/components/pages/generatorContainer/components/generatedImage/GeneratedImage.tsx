import { Dispatch, SetStateAction, useState } from "react";
import style from "./generatedImage.module.scss";
import Image from "next/image";
import LGBorder from "@/components/ui/lGBorder/LGBorder";
import DownloadIcon from "@/public/downloadIcon.svg";
import Button from "@/components/ui/button/Button";
// import ShareIcon from "@/public/shareIcon.svg";

interface IGeneratedImage {
  image: string;
  setImage: Dispatch<SetStateAction<string | null>>;
  linkImage?: string | null;
  setLinkImage: Dispatch<SetStateAction<string | null>>;
}

export default function GeneratedImage({
  image,
  setImage,
  linkImage,
  setLinkImage,
}: IGeneratedImage) {
  // Данный код раскомментировать, когда будет принято решение добавить функционал "Поделиться"

  // const [share, setShare] = useState(false);

  const downloadImage = async () => {
    if (linkImage) {
      const response = await fetch(linkImage);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image.png";
      link.click();
    }
  };

  const handleClickRemove = () => {
    setImage(null);
    setLinkImage(null);
  };

  const stylesBorder = {
    padding: "1px",
    colorTop: "rgba(250, 250, 250, 0.27)",
    colorBottom: "rgba(250,250,250, 0)",
    borderRadius: "16px",
  };

  // Данный код раскомментировать, когда будет принято решение добавить функционал "Поделиться"

  // useEffect(() => {
  //   window.Ya.share2("ya", {
  //     theme: {
  //       services: "linkedin,facebook,telegram,twitter",
  //       size: "l",
  //       limit: 4,
  //       lang: "en",
  //       bare: false,
  //       direction: "vertical",
  //     },
  //     content: { url: image },
  //     hooks: {
  //       onshare: function (name: string) {
  //         setShare(false);
  //       },
  //     },
  //   });
  // }, []);

  return (
    <div className={style.generatedImage}>
      <LGBorder styles={stylesBorder} className={style.generatedImage__border}>
        <div className={style.generatedImage__imageWrapper}>
          <div className={style.generatedImage__removeButton}>
            {" "}
            <Button type="remove" onClick={handleClickRemove} />
          </div>
          <div className={style.generatedImage__imageItem}>
            <Image
              src={image}
              alt="selected image"
              width={620}
              height={960}
              className={style.generatedImage__image}
            />
          </div>
          <div className={style.generatedImage__buttonWrapper}>
            <button
              type="button"
              className={`${style.generatedImage__button} ${style.generatedImage__buttonDownload}`}
              onClick={() => downloadImage()}
            >
              <Image src={DownloadIcon} alt="downloadIcon" />
              Download
            </button>
            {/* Данный код раскомментировать, когда будет принято решение добавить функционал "Поделиться" */}

            {/* <div className={style.generatedImage__share}>
              <button
                type="button"
                className={`${style.generatedImage__button} ${style.generatedImage__buttonShare}`}
                onClick={() => setShare(!share)}
              >
                <Image src={ShareIcon} alt="shareIcon" />
                Share
              </button>
              <div
                id="ya"
                className={[
                  style.generatedImage__iconsList,
                  share && style.generatedImage__iconsList_vizible,
                ].join(" ")}
              ></div>
            </div> */}
          </div>
        </div>
      </LGBorder>
    </div>
  );
}
