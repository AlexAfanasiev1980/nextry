"use client";

import { useState } from "react";
import Button from "@/components/button/Button";
import style from "./FormBlock.module.scss";

const FormBlock = () => {
  const [email, setEmail] = useState("");
  return (
    <form
      className={style.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label>
        E-mail
        <input
          type="text"
          name="email"
          value={email}
          placeholder=""
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <div className={style.policy}>
        <div className={style.policy__icon} />
        <p className={style.text}>
          <span>
            By clicking “Continue”, I agree to the{" "}
            <a href="" className={style.link}>
              policy regarding the processing of personal data
            </a>
          </span>
        </p>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormBlock;
