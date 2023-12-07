"use client";

import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import style from "./confirmation.module.scss";
import { validate } from "@/lib/validate";
import MoveBackIcon from "@/public/ArrowBack.png";
import Link from "next/link";
import Image from "next/image";
import { Timer } from "@/components/timer/Timer";

export default function Confirmation() {
  const [data, setData] = useState<any>({
    name: "",
    login: "",
    password: "",
    email: "",
  });
  const [value, setValue] = useState<string>("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [timeComplited, setTimeComlited] = useState(false);
  //   const [sendAgainVisible, setSendAgainVisible] = useState(true);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const valid = validate(e.target.value, /\d{4,4}/);
    if (error !== "") {
      setError("");
    }
    setValid(valid);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valid && data.email !== "") {
      const bodyRequest = {
        email: data.email,
        code: Number(value),
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/confirmation`,
          {
            method: "POST",
            body: JSON.stringify(bodyRequest),
          }
        );

        const result = await res.json();

        if (res.status !== 201) {
          console.log(result);
          setError(result.message);
        } else if (res.status === 201) {
          sessionStorage.removeItem("data");
          router.refresh();
          router.push("/");
        }
      } catch (error) {}
    }
  };

  const handleSubmitAgain = async () => {
    setTimeComlited(false);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logup`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (res.status === 422) {
        setError(`${result.data.loc[1]}: ${result.data.msg}`);
      }
      if (res.status === 400) {
        setError(`${result.data}`);
      }
      if (res.status === 201) {
        setValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimerComplete = () => {
    setTimeComlited(true);
  };

  useEffect(() => {
    const data = sessionStorage.getItem("data");
    if (data !== null) {
      setData(JSON.parse(data));
    }
  }, []);

  //   useEffect(() => {
  //     setSendAgainVisible(false);
  //     error && setSendAgainVisible(true);
  //   }, [error]);

  return (
    <section className={style.confirmation}>
      <Link href="/sign-up" className={style.confirmation__moveBack}>
        <Image src={MoveBackIcon} alt="move back img" />
        <p>BACK</p>
      </Link>
      <h1 className={style.confirmation__title}>
        Enter the code that you received on {data.email}
      </h1>
      <form
        className={style.confirmation__form}
        onSubmit={(e) => onSubmit(e)}
        noValidate
      >
        <div className={style.confirmation__inputWrapper}>
          <input
            id="code"
            type="text"
            name="code"
            value={value}
            onChange={handleChange}
            maxLength={4}
            title="Fill in this field"
          />
          <div>Code</div>
        </div>
        <div className={style.confirmation__errorSection}>
          <p className={style.confirmation__error}>
            {!valid && valid !== null && "You must enter a 4-digit code"}
            {error !== "" && error}
          </p>
          {timeComplited ? (
            <button
              type="button"
              className={style.confirmation__completed}
              onClick={() => handleSubmitAgain()}
            >
              Resend code
            </button>
          ) : (
            <button className={style.confirmation__inProgress}>
              You can resend via &nbsp;
              <Timer
                time={1000}
                onTimerComplete={handleTimerComplete}
                textAfterTimeOff={""}
              />
              {`  `}
            </button>
          )}
        </div>

        <button type="submit" className={style.confirmation__submit}>
          Confirm
        </button>
      </form>
    </section>
  );
}
