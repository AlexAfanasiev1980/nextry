"use client";

import Link from "next/link";
import Image from "next/image";
import MoveBackIcon from "@/public/ArrowBack.png";
import {
  useState,
  type FormEvent,
  type ChangeEvent,
  FormEventHandler,
  InvalidEvent,
} from "react";
import { useRouter } from "next/navigation";
import { logInTypes } from "./logInTypes";
import style from "./LogInContainer.module.scss";
import { POLICY_ROUTE } from "@/routes";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import Google from "@/public/google.png";
import { Oval } from "react-loader-spinner";

interface LogIn {
  type: "sign-in" | "sign-up";
}

interface IRes extends Response {
  message?: string;
}

const LogInContainer = ({ type }: LogIn) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { password, confirmPassword, handlePasswordValidation } =
    usePasswordValidation({ type, setError });
  const errorStyle = error ? style.errorMessage : style.errorHide;
  const router = useRouter();

  const authGoogle = async (e: any) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/login/google`
      );
      const { url } = await res.json();

      if (url) {
        router.replace(url);
      }
    } catch (error) {
      setIsSubmiting(false);
      console.error(error);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (type === "sign-up" && password !== confirmPassword) {
      setError("Password mismatch");
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
    setLoading(true);
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
            setLoading(false);
          } else if (res.status === 200) {
            router.refresh();
            router.push("/");
          }
          break;
        case "sign-up":
          if (res.status === 422) {
            setError(`${result.data.loc[1]}: ${result.data.msg}`);
            setLoading(false);
          }
          if (res.status === 400) {
            setError(`${result.data}`);
            setLoading(false);
          }
          if (res.status === 201) {
            sessionStorage.setItem("data", JSON.stringify(body));
            router.refresh();
            router.push("/confirmation");
          }
          break;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    const area = e.target.name;
    if (e.target.validity.valueMissing) {
      if (
        area === "email" ||
        area === "name" ||
        area === "password" ||
        area === "confirmPassword"
      ) {
        e.target.setCustomValidity("Fill out this field!");
      } else {
        e.target.setCustomValidity("To continue, check this box");
      }
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
    <>
      <Link href="/" className={style.moveBack}>
        <Image src={MoveBackIcon} alt="move back img" />
        <p>BACK</p>
      </Link>
      <div className={style.formWrapper}>
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
                  onInvalid={(e: InvalidEvent<HTMLInputElement>) =>
                    onInvalid(e)
                  }
                  onChange={(e: InvalidEvent<HTMLInputElement>) =>
                    e.target.setCustomValidity("")
                  }
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
                autoComplete="email"
                onInvalid={(e: InvalidEvent<HTMLInputElement>) => onInvalid(e)}
                onChange={(e: InvalidEvent<HTMLInputElement>) =>
                  e.target.setCustomValidity("")
                }
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
                onChange={(e) => {
                  e.target.setCustomValidity("");
                  handlePasswordValidation(e, "password");
                }}
                onInvalid={(e: InvalidEvent<HTMLInputElement>) => onInvalid(e)}
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
                  onInvalid={(e: InvalidEvent<HTMLInputElement>) =>
                    onInvalid(e)
                  }
                  onChange={(e) => {
                    e.target.setCustomValidity("");
                    handlePasswordValidation(e, "confirmPassword");
                  }}
                  placeholder=""
                  required
                  aria-label="confirmPassword"
                  title="Fill in this field"
                />
                <div>Confirm Password</div>
              </div>
            )}
            <p className={errorStyle}>{error}</p>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          {type === "sign-up" && (
            <div className={style.policy}>
              <input
                type="checkbox"
                name="policyChecked"
                aria-label="policyChecked"
                className={style.policy__icon}
                onInvalid={(e: InvalidEvent<HTMLInputElement>) => onInvalid(e)}
                onChange={(e: InvalidEvent<HTMLInputElement>) =>
                  e.target.setCustomValidity("")
                }
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
          )}
          <button className={style.submit} disabled={loading}>
            {loading && (
              <Oval
                visible={true}
                height="36"
                width="36"
                color="#2b5ac1"
                secondaryColor="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
            {!loading && logInTypes[type].title}
          </button>
          <div className={style.text}>
            {logInTypes[type].bottomText}{" "}
            <Link href={logInTypes[type].route} className={style.link}>
              {logInTypes[type].textForLink}
            </Link>
          </div>
        </form>
        <div className={style.divider}>
          <p className={style.divider__text}>or</p>
        </div>
        <div className={style.signGoogle}>
          <button
            type="button"
            onClick={authGoogle}
            className={style.signGoogle__button}
            disabled={isSubmiting}
          >
            <Image
              src={Google}
              alt="google icon"
              width={40}
              height={40}
              className={style.signGoogle__img}
            />
            {isSubmiting && (
              <Oval
                visible={true}
                height="36"
                width="36"
                color="#2b5ac1"
                secondaryColor="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
            {!isSubmiting && "Sign in with Google"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LogInContainer;
