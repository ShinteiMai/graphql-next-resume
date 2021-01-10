import React from "react";
import clsx from "clsx";
import { TComponent } from "@components/types";

interface Props extends TComponent {
  width?: number;
  height?: number;
}

const Divider = ({
  "data-testid": testId,
  className,
  height,
  width,
}: Props) => {
  return (
    <div
      className={clsx("bg-primary float-left opacity-75", className)}
      style={{
        width: `${width || "0.75"}px`,
        height: `${height || "16"}px`,
      }}
      data-testid={testId || "divider"}
    />
  );
};
export default Divider;
