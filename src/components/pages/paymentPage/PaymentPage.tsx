"use client";

import Button from "@/components/ui/button/Button";
import style from "./paymentPage.module.scss";
import Typography from "@/components/ui/typography/Typography";
import { cards } from "./data";
import { useState } from "react";
import Card from "./card/Card";

export default function PaymentPage() {
  const [period, setPeriod] = useState("Annually");

  const handlePeriod = () => {
    setPeriod((prev) => (prev === "Annually" ? "Monthly" : "Annually"));
  };

  return (
    <main className={style.payment}>
      <div className={style.payment__backButton}>
        <Button type={"back"} link="/" />
      </div>
      <div className={style.payment__content}>
        <div className={style.payment__title}>
          <Typography variant={"h2"}>Pricing Plans for nextry.app</Typography>
          <Typography variant={"subtitle"}>
            Choose a plan tailored to your needs
          </Typography>
        </div>
        <div className={style.payment__periodSelection}>
          <div className={style.payment__period}>
            <Typography variant={"subtitle"}>Monthly</Typography>
          </div>
          <div className={style.payment__period}>
            <Typography variant={"subtitle"}>Annually</Typography>
          </div>
          <Button
            type="button"
            onClick={handlePeriod}
            className={`${style.payment__selector} ${
              period === "Annually"
                ? style.payment__annually
                : style.payment__monthly
            }`}
            border
          >
            {period}
          </Button>
        </div>
        <ul className={style.payment__cards}>
          {cards.map((card) => (
            <Card key={card.id} card={card} period={period}/>
          ))}
        </ul>
      </div>
    </main>
  );
}
