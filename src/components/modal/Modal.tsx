"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import style from "./modal.module.scss";
import { MouseEvent } from "react";
import LGBorder from "../ui/lGBorder/LGBorder";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function onDismiss(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      router.back();
    }
  }

  const stylesBorder = {
    padding: "1px",
    colorTop: "rgba(250, 250, 250, 0.27)",
    colorBottom: "rgba(250, 250, 250, 0)",
    borderRadius: "16px",
  };

  return createPortal(
    <div
      className={style.modalBackdrop}
      id="overflow"
      onClick={(e) => onDismiss(e)}
    >
      <LGBorder
        styles={stylesBorder}
        className={style.generator__wrapperSlider}
      >
        <div className={style.modalBackdrop__modal}>
          <div className={style.modalBackdrop__back}>
            {children}
          </div>
          {/* <div
          onClick={(e) => onDismiss(e)}
          className={style.modalBackdrop__closeButton}
        ></div> */}
        </div>
      </LGBorder>
    </div>,
    document.getElementById("modal-root")!
  );
}
