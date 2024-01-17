"use client";

import Link from "next/link";
import MoveBackIcon from "@/public/ArrowBack.png";
import Image from "next/image";
import style from "./forgotPassword.module.scss";
import { FormEvent, useState } from "react";
import { requestPassword } from "@/lib/data";

const REQUEST_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ForgotPassword() {
  const [requestPasswordStatus, setRequestPasswordStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const errorStyle = error
    ? style.forgotPassword__errorMessage
    : style.forgotPassword__errorHide;

  const handleChange = () => {
    if (error) {
      setError("");
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    setEmail(email);
    if (email) {
      const res = await requestPassword(
        `${REQUEST_URL}/user/request-password-reset`,
        { email: email }
      );
      const response = await res?.json();

      if (res?.status === 200) {
        setRequestPasswordStatus(true);
        localStorage.setItem("email", email);
      } else {
        setError(response?.detail);
        console.error(response);
      }
    }
  };

  return (
    <>
      <Link href="/sign-in" className={style.forgotPassword__moveBack}>
        <Image src={MoveBackIcon} alt="move back img" />
        <p>BACK</p>
      </Link>
      {!requestPasswordStatus && (
        <form className={style.forgotPassword__form} onSubmit={onSubmit}>
          <h1>Access recovery</h1>
          <p>Enter the email you specified during registration</p>
          <div className={style.forgotPassword__inputsBlock}>
            <div className={style.forgotPassword__inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder=""
                required
                aria-label="email"
                title="Fill in this field"
                onChange={handleChange}
              />
              <div>E-mail</div>
            </div>
            <p className={errorStyle}>{error}</p>
          </div>

          <button className={style.forgotPassword__submit}>Send</button>
        </form>
      )}
      {requestPasswordStatus && (
        <div className={style.forgotPassword__form}>
          <h1>{`A link to restore access has been sent to ${email}`}</h1>
        </div>
      )}
    </>
  );
}
