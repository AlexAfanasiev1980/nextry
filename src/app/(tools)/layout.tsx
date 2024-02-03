import Header from "@/components/header/Header";
import style from "./layout.module.scss";
import Button from "@/components/ui/button/Button";

export default async function Generator({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header type="generator" />
      <div className={style.layout}>
        <div className={style.layout__back}>
          <Button type="back" link={"/"} />
        </div>

        {children}
      </div>
    </>
  );
}
