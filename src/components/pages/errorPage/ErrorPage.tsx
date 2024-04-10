"use client";

import Button from "@/components/ui/button/Button";
import style from "./error.module.scss";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  function onDismiss(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    router.back();
  }

  return (
    <section className={style.error}>
      <p>Technical work is underway on the server.</p>
      <div className={style.error__buttonItem}>
        <Button
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => onDismiss(e)}
        >
          ОК
        </Button>
      </div>
    </section>
  );
}
