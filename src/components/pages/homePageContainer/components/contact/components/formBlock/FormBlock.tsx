"use client";

import { FormEvent, InvalidEvent, useState } from "react";
import style from "./FormBlock.module.scss";
// import { POLICY_ROUTE } from "@/routes";
import Link from "next/link";
import cookie from "js-cookie";
import Button from "@/components/ui/button/Button";
import { feedback } from "@/lib/data";
import { FEEDBACK_API } from "@/api";

const FormBlock = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const onInvalid = (e: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const area = e.target.name;
    if (e.target.validity.valueMissing) {
        e.target.setCustomValidity("Fill out this field!");
    } else if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(
        `Enter data in the specified format. ${e.target.title}`
      );
    } else if (e.target.validity.typeMismatch) {
      if (area === "email") {
        if (!/@/g.test(e.target.value)) {
          e.target.setCustomValidity(
            `The email address must retain the character \"@\". The address ${e.target.value} is missing the \"@\" character.`
          );
        } else if (!/@([\w-]+\.)/.test(e.target.value)) {
          e.target.setCustomValidity(
            `
            Enter the part of the address after the \"@\" symbol. The address ${e.target.value} is incomplete.`
          );
        }
      }
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handleFeedback = async (e: FormEvent) => {
    e.preventDefault();
    const token = await cookie.get("OutSiteJWT");
    if (token) {
      try {
        const body = {
          message: question,
          reply_email: email,
          title: "feedback",
        };
        const res = await feedback(FEEDBACK_API, body, token);
        if (res?.status === 204) {
          setEmail("");
          setQuestion("");
          alert("Your question has been sent successfully");
        } else {
          alert("Something went wrong, try again later");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Only registered users can ask questions");
    }
  };

  return (
    <form className={style.form} onSubmit={handleFeedback}>
      <div className={style.form__inputsBlock}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          required
          autoComplete="email"
          onInvalid={(e: InvalidEvent<HTMLInputElement>) => onInvalid(e)}
          onChange={(e: InvalidEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            onInvalid(e);
          }}
          aria-label="email"
          className={style.form__email}
        />
        <textarea
          name="question"
          value={question}
          placeholder="Question"
          required
          onInvalid={(e: InvalidEvent<HTMLTextAreaElement>) => onInvalid(e)}
          onChange={(e: InvalidEvent<HTMLTextAreaElement>) => {
            setQuestion(e.target.value);
            e.target.setCustomValidity("");
          }}
          className={style.form__question}
        />
      </div>

      <div className={style.policy}>
        <p className={style.text}>
          <span>
            By clicking “Send”, I agree to the{" "}
            <Link href={"#"} target="_blank" className={style.link}>
              Policy regarding the processing of personal data
            </Link>
          </span>
        </p>

        <Button type="button" submit={true}>
          Send
        </Button>
      </div>
    </form>
  );
};

export default FormBlock;
