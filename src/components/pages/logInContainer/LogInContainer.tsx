"use client";

import Link from "next/link";
import Image from "next/image";
import MoveBackIcon from "@/public/ArrowBack.png";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { logInTypes } from "./logInTypes";

import style from "./LogInContainer.module.scss";
import { POLICY_ROUTE } from "@/routes";

interface LogIn {
  type: "sign-in" | "sign-up";
}

interface IRes extends Response {
  message?: string;
}

const LogInContainer = ({ type }: LogIn) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const errorStyle = error ? style.errorMessage : style.errorHide;
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (type === "sign-up" && password !== confirmPassword) {
      setError("Password mismatch")
      return;
    }

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
      const res: IRes = await fetch(
        type === "sign-in"
          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`
          : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logup`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      const result = await res.json();
      switch (type) {
        case "sign-in":
          if (res.status !== 200) {
            setError("Incorrect username or password");
          } else if (res.status === 200) {
            router.refresh();
            router.push("/");
          }
          break;
        case "sign-up":
          if (res.status === 422) {
            setError(`${result.data.loc[1]}: ${result.data.msg}`);
          }
          if (res.status === 400) {
            setError(`${result.data}`);
          }
          if (res.status === 201) {
            sessionStorage.setItem("data", JSON.stringify(body));
            router.refresh();
            router.push("/confirmation");
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordValidation = (
    e: ChangeEvent<HTMLInputElement>,
    typePassword: string
  ) => {
    if (typePassword === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }

    if (type === "sign-in") {
      return;
    }

    if (typePassword === "confirmPassword") {
      if (password !== e.target.value) {
        setError("Password mismatch");
      } else {
        setError("");
      }
    } else {
      if (confirmPassword === "") {
        setError("");
        return;
      }

      if (confirmPassword !== e.target.value) {
        setError("Password mismatch");
      } else {
        setError("");
      }
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
              title="Fill in this field"
            />
            <div>E-mail</div>
          </div>
          <div className={style.inputWrapper}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => handlePasswordValidation(e, "password")}
              placeholder=""
              required
              aria-label="password"
              title="Fill in this field"
            />
            <div>Password</div>
          </div>
          {type === "sign-up" && (
            <div className={style.inputWrapper}>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handlePasswordValidation(e, "confirmPassword")}
                placeholder=""
                required
                aria-label="confirmPassword"
                title="Fill in this field"
              />
              <div>Confirm Password</div>
            </div>
          )}
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
            title="To continue, check this box"
          />
          <p>
            By clicking “{logInTypes[type].title}”, I agree to the{" "}
            <a href={"#"} target="_blank" className={style.link}>
              policy regarding the processing of personal data
            </a>
          </p>
        </div>
        <button className={style.submit} >{logInTypes[type].title}</button>
        <div>
          {logInTypes[type].bottomText}{" "}
          <Link href={logInTypes[type].route} className={style.link}>
            {logInTypes[type].textForLink}
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LogInContainer;
