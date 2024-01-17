"use client";

import usePasswordValidation from "@/hooks/usePasswordValidation";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import style from "./resetPassword.module.scss";
import { requestPassword } from "@/lib/data";
import Link from "next/link";

const REQUEST_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [resetPasswordStatus, setResetPasswordStatus] = useState(false);
  const { password, confirmPassword, handlePasswordValidation } =
    usePasswordValidation({ type: "sign-up", setError });
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const errorStyle = error
    ? style.resetPassword__errorMessage
    : style.resetPassword__errorHide;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    if (error === "") {
      const body = {
        email,
        new_password: password,
        token,
      };

      if (email && password && token) {
        setEmail(email);
        if (email) {
          const res = await requestPassword(
            `${REQUEST_URL}/user/reset-password`,
            body
          );
          const response = await res?.json();

          if (res?.status === 200) {
            setResetPasswordStatus(true);
            localStorage.removeItem("email");
          } else {
            setError(
              response?.detail.include("Invalid token")
                ? "The link is out of date or contains an error"
                : "Something went wrong. Please try again later"
            );
            console.error(response);
          }
        }
      }
    }
  };

  useEffect(() => {
    const emailUser = localStorage.getItem("email");
    if (emailUser) {
      setEmail(emailUser);
    }
  }, []);

  return (
    <>
      {!resetPasswordStatus && (
        <form className={style.resetPassword__form} onSubmit={onSubmit}>
          <p className={style.resetPassword__text}>Enter a new password</p>
          <div className={style.resetPassword__inputsBlock}>
            <div className={style.resetPassword__inputWrapper}>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => handlePasswordValidation(e, "password")}
                placeholder=""
                required
                aria-label="password"
                key={"password"}
                title="Fill in this field"
              />
              <div>Password</div>
            </div>
            <div className={style.resetPassword__inputWrapper}>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handlePasswordValidation(e, "confirmPassword")}
                placeholder=""
                required
                aria-label="confirmPassword"
                key={"confirmPassword"}
                title="Fill in this field"
              />
              <div>Confirm Password</div>
            </div>
            <p className={errorStyle}>{error}</p>
          </div>
          <button className={style.resetPassword__submit}>Set password</button>
        </form>
      )}
      {resetPasswordStatus && (
        <div className={style.resetPassword__form}>
          <p className={style.resetPassword__text}>
            The password has been successfully changed.
          </p>
          <Link href="/sign-in">Go to login page</Link>
        </div>
      )}
    </>
  );
}
