import * as style from "./errorUi.css";

interface ErrorUiProps {
  message: string;
}

const ErrorUi = (props: ErrorUiProps) => {
  const { message } = props;

  return <div className={style.container}>{message}</div>;
};

export default ErrorUi;
