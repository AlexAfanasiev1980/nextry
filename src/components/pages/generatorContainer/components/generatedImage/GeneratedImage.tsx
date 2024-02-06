import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import style from "./generatedImage.module.scss";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import LGBorder from "@/components/ui/lGBorder/LGBorder";
import RepeatIcon from "@/public/repeat.svg";
import DownloadIcon from "@/public/downloadIcon.svg";
// import ShareIcon from "@/public/shareIcon.svg";

interface IGeneratedImage {
  image: string;
  setImage: Dispatch<SetStateAction<string | null>>;
}

export default function GeneratedImage({ image, setImage }: IGeneratedImage) {
  const [share, setShare] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

  const stylesBorder = {
    padding: "1px",
    colorTop: "rgba(250, 250, 250, 0.27)",
    colorBottom: "rgba(250,250,250, 0)",
    borderRadius: "16px",
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
          <div className={style.generatedImage__imageItem}>
            <Image
              src={image}
              alt="selected image"
              width={620}
              height={960}
              className={style.generatedImage__image}
              ref={imageRef}
            />
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
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

      <div className={style.generatedImage__buttonAgain}>
        <Button
          type="button"
          onClick={() => {
            setImage(null);
          }}
        >
          <Image src={RepeatIcon} alt="icon repeat" />
          Process again
        </Button>
      </div>
    </div>
  );
}
