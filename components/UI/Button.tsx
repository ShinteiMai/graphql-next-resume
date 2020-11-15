import clsx from "clsx";
import React from "react";
import { TComponent } from "..";

interface Props extends TComponent {
  onClick?: () => void;
}

const Button = ({
  children,
  onClick,
  "data-testid": testId,
  className,
}: Props) => {
  return (
    <button
      className={clsx(
        "bg-transparent text-primary text-sm py-1 px-6 border border-primary hover:border-transparent rounded-md transform hover:bg-secondary hover:bg-opacity-25 hover:font-medium focus:outline-none focus:-translate-y-1 focus:shadow-md transition-all duration-150",
        className
      )}
      onClick={onClick}
      data-testid={testId || "button"}
    >
      {children}
    </button>
  );
};
export default Button;
