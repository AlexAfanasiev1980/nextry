"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import style from "./auth.module.scss";

import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";

export default function Auth() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");

  async function Auth() {
    try {
      if (code) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login-google`,
          {
            method: "POST",
            body: JSON.stringify({ access_token: code }),
          }
        );

        const result = await res.json();
        if (res.status === 200) {
          router.refresh();
          router.push("/");
        } else {
          router.refresh();
          console.error(result.message);
          alert("An authorization error occurred. Try logging in later");
          router.push("/sign-in");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      Auth();
  }, []);

  return (
    <div className={style.auth}>
      <RotatingLines
        visible={true}
        width="96"
        strokeColor="grey"
        strokeWidth="3"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}
