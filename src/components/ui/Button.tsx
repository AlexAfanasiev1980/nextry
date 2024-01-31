import BackButton from "./backButton/BackButton";

interface IButton {
  type: string;
  fn?: () => void;
  link?: string;
}

interface IType {
  [key: string]: JSX.Element;
}

export default function Button({ type, ...rest }: IButton): JSX.Element {
  const button: IType = {
    back: <BackButton {...rest}/>,
  };

  return button[type];
}
