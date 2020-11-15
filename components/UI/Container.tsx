import React from "react";
import clsx from "clsx";
import { TComponent } from "..";

interface Props extends TComponent {}

const Container = ({ children, className, "data-testid": testId }: Props) => {
  return (
    <div data-testid={testId || "container"} className={clsx(className)}>
      {children}
    </div>
  );
};
export default Container;
