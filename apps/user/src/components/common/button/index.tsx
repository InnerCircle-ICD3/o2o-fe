import { buttonStatus } from "./button.css";

type ButtonStatus = keyof typeof buttonStatus;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: ButtonStatus;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { status = "common", children, ...rest } = props;
  const buttonStyle = buttonStatus[status];

  return (
    <button className={buttonStyle} disabled={status === "disabled" || rest.disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
