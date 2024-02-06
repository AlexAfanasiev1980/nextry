import Image from "next/image";
import YoutubeIcon from "@/public/youtubeIcon.png";
import FacebookIcon from "@/public/facebookIcon.png";
import InstagramIcon from "@/public/instagramIcon.png";
import style from "./LinksBlock.module.scss";

const LinksBlock = () => {
  return (
    <div className={style.links}>
      <p>
        For partnership opportunities{" "}
        <a className={style.link} href="mailto:business@nextry.ai">
          business@nextry.ai
        </a>
      </p>
      {/* <p>
        For press inquiries{" "}
        <a className={style.link} href="mailto:bussiness@nextry.ai">
          bussiness@nextry.ai
        </a>
      </p> */}
      <div className={style.links__icons}>
        <Image src={YoutubeIcon} alt="youtube icon" />
        <Image src={FacebookIcon} alt="facebook icon" />
        <Image src={InstagramIcon} alt="instagram icon" />
      </div>
    </div>
  );
};

export default LinksBlock;
