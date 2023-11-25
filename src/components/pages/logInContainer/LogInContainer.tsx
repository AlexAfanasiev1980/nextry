"use client";

import Link from "next/link";
import Image from "next/image";
import MoveBackIcon from "@/public/ArrowBack.png";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { logInTypes } from "./logInTypes";

import style from "./LogInContainer.module.scss";
import { POLICY_ROUTE } from "@/routes";

interface LogIn {
  type: "sign-in" | "sign-up";
}

const LogInContainer = ({ type }: LogIn) => {
  const [error, setError] = useState("");
  const errorStyle = error ? style.errorMessage : style.errorHide;
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body =
      type === "sign-up"
        ? {
            name: formData.get("name"),
            login: formData.get("email"),
            password: formData.get("password"),
            email: formData.get("email"),
          }
        : {
            login: formData.get("email"),
            password: formData.get("password"),
          };

    try {
      const res = await fetch(type === "sign-in" ? 
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login` : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logup`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      const result = await res.json();
      if (res.status === 200 || res.status === 201) {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={style.logInContainer}>
      <Link href="/" className={style.moveBack}>
        <Image src={MoveBackIcon} alt="move back img" />
        <p>BACK</p>
      </Link>
      <form className={style.logInForm} onSubmit={(e) => onSubmit(e)}>
        <h1>{logInTypes[type].title}</h1>
        <p>use E-mail to {logInTypes[type].title}</p>
        <div className={style.inputsBlock}>
          {type === "sign-up" && (
            <div className={style.inputWrapper}>
              <input
                type="text"
                name="name"
                placeholder=""
                required
                aria-label="name"
              />
              <div>Name</div>
            </div>
          )}
          <div className={style.inputWrapper}>
            <input
              type="email"
              name="email"
              placeholder=""
              required
              aria-label="email"
            />
            <div>E-mail</div>
          </div>
          <div className={style.inputWrapper}>
            <input
              type="password"
              name="password"
              placeholder=""
              required
              aria-label="password"
            />
            <div>Password</div>
          </div>
          <p className={errorStyle}>{error}</p>
          <a href="#">Forgot Password?</a>
        </div>
        <div className={style.policy}>
          <input
            type="checkbox"
            name="policyChecked"
            aria-label="policyChecked"
            className={style.policy__icon}
            required
          />
          <p>
            By clicking “{logInTypes[type].title}”, I agree to the{" "}
            <a href={"#"} target="_blank" className={style.link}>
              policy regarding the processing of personal data
            </a>
          </p>
        </div>
        <button className={style.submit}>{logInTypes[type].title}</button>
        <p>
          {logInTypes[type].bottomText}{" "}
          <Link href={logInTypes[type].route} className={style.link}>
            {logInTypes[type].textForLink}
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LogInContainer;
