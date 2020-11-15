import React from "react";
import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Paragraph = ({ children, className }: Props) => {
  return (
    <p data-testid="paragraph" className={clsx("text-base", className)}>
      {children}
    </p>
  );
};
export default Paragraph;
