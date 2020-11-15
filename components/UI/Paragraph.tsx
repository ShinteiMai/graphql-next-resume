import React from "react";
import clsx from "clsx";
import { TComponent } from "..";

interface Props extends TComponent {}

const Paragraph = ({ children, className }: Props) => {
  return (
    <p data-testid="paragraph" className={clsx("text-base", className)}>
      {children}
    </p>
  );
};
export default Paragraph;
