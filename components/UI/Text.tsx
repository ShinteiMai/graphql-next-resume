import React from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Text = ({ className, children }: Props) => {
  return (
    <span data-testid="text" className={clsx("text-base", className)}>
      {children}
    </span>
  );
};

export default Text;
