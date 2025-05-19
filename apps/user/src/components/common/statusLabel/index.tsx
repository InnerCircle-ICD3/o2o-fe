import type { PropsWithChildren } from "react";
import { statusLabel } from "./statusLabel.css";

type StatusLabelType = keyof typeof statusLabel;

interface StatusLabelProps extends PropsWithChildren {
  status: StatusLabelType;
}

const StatusLabel = (props: StatusLabelProps) => {
  const { status, children } = props;

  const statusStyle = statusLabel[status];

  return <p className={statusStyle}>{children}</p>;
};

export default StatusLabel;
