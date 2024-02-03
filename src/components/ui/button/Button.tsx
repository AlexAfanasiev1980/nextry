import BackButton from "./backButton/BackButton";
import MainButton from "./mainButton/MainButton";
import RemoveButton from "./removeButton/RemoveButton";

interface IButton {
  type: string;
  onClick?: () => void;
  link?: string;
  className?: string
  children?: string;
  border?: boolean;
}

interface IType {
  [key: string]: JSX.Element;
}

export default function Button({ type, ...rest }: IButton): JSX.Element {
  const button: IType = {
    back: <BackButton {...rest}/>,
    button: <MainButton {...rest} />,
    remove: <RemoveButton {...rest} />
  };

  return button[type];
}
