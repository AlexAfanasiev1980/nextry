import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@/routes";

export const logInTypes = {
  "sign-up": {
    title: "Sign Up",
    bottomText: "You already have an account?",
    textForLink: "Log In",
    route: SIGN_IN_ROUTE,
    fetch: "signup",
  },
  "sign-in": {
    title: "Log In",
    bottomText: "You don’t have an account yet?",
    textForLink: "Sign Up",
    route: SIGN_UP_ROUTE,
    fetch: "signin",
  },
};
