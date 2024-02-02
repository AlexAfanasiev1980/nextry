import Typography from "@/components/ui/typography/Typography";
import NotService from '@/public/notServise.svg';
import IsService from '@/public/isServise.svg';
import style from "./card.module.scss";
import Image from "next/image";

export default function Card({ card, period }: any) {
  return (
    <li className={`${style.card} ${style[`card_${card.id}`]}`}>
      <div
        className={`${style.card__cardContent} ${
          style[`card__cardContent_${card.id}`]
        }`}
      >
        <div className={style.card__topContent}>
          <Typography
            variant={"h2"}
            className={`${style.card__cardTitle} ${
              style[`card__cardTitle_${card.id}`]
            }`}
          >
            {card.title}
          </Typography>
          <div className={style.card__coast}>
            <span
              className={`${style.card__coastItem} ${
                style[`card__cardTitle_${card.id}`]
              }`}
            >{`${`$`}${
              period === "Monthly" ? card.coast : card.coast * 12
            }`}</span>
            <span className={style.card__period}>{` / ${
              period === "Monthly" ? "month" : "year"
            }`}</span>
          </div>
          <div className={style.card__infoWrapper}>
            {card.period && (
              <Typography variant={"p1"} className={`${style.card__data}`}>
                {card.period}
              </Typography>
            )}
            {!card.period && (
              <>
                <Typography variant={"p1"} className={`${style.card__data}`}>
                  {`$${card.coast * 12} / year`}
                </Typography>
                <Typography variant={"p1"} className={`${style.card__info}`}>
                  Save $96 with annual
                </Typography>
              </>
            )}
          </div>
          {!card.period && (
            <button type="button" className={style.card__button}>
              Subscribe
            </button>
          )}
        </div>
        <ul className={style.card__bottomContent}>
          {card.service.map((service: any) => (
            <li key={service.name} className={style.card__service}>
              <Image src={service.access ? IsService : NotService} alt="icon" className={style.card__image} />
              <Typography variant={"p1"} className={`${style.card__data}`}>
                {service.name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
