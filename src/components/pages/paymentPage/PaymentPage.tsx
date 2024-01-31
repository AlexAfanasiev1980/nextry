import Button from "@/components/ui/Button";
import style from "./paymentPage.module.scss";

export default function PaymentPage() {
  return (
    <div className={style.payment}>
        <div className={style.payment__backButton}>
        <Button type={"back"} link="/" />
        </div>   
    </div>
  );
}
