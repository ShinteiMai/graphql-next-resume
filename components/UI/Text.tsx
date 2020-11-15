import React from "react";
import clsx from "clsx";
import { TComponent } from "..";

interface Props extends TComponent {}

const Text = ({ className, children }: Props) => {
  return (
    <span data-testid="text" className={clsx("text-accents-1", className)}>
      {children}
    </span>
  );
};

export default Text;
