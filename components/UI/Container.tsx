import React from "react";
import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div data-testid="container" className={clsx("", className)}>
      {children}
    </div>
  );
};
export default Container;
