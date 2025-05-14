import { buttonVariants } from "./button.css";

type ButtonVariants = keyof typeof buttonVariants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { variant = "common", children, ...rest } = props;
  const buttonStyle = buttonVariants[variant];

  return (
    <button className={buttonStyle} disabled={variant === "disabled" || rest.disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
