import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function usePasswordValidation({
  type,
  setError,
}: {
  type: "sign-in" | "sign-up";
  setError: Dispatch<SetStateAction<string>>;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  return { password, confirmPassword, handlePasswordValidation };
}
