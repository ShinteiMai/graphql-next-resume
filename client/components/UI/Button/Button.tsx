import { TComponent } from "@components/types";
import clsx from "clsx";
import React from "react";

interface Props extends TComponent {
  link?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  onClick,
  "data-testid": testId,
  className,
  link,
}: Props) => {
  return (
    <button
      className={clsx(
        "bg-transparent text-primary text-sm py-1 px-6 border border-primary hover:border-transparent rounded-md transform hover:bg-secondary hover:bg-opacity-25 hover:font-medium focus:outline-none focus:-translate-y-1 focus:shadow-md transition-all duration-150",
        className
      )}
      onClick={() => {
        if (!!link) {
          window.open(link, "_blank");
        } else if (onClick) {
          onClick();
        }
      }}
      data-testid={testId || "button"}
    >
      {children}
    </button>
  );
};
export default Button;
