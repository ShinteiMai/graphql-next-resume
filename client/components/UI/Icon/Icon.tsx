import { TComponent } from "@components/types";
import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons/lib";

interface Props extends TComponent {
  size?: number;
  SVG: IconType;
}

const defaultSize = 24;

const Icon = ({ SVG, size, className, "data-testid": testId }: Props) => {
  return (
    <SVG
      data-testid={testId || "icon"}
      size={size || defaultSize}
      className={clsx(
        "fill-current text-accents-1 hover:text-primary transform hover:-translate-y-1 transition duration-150 ease-in-out",
        className
      )}
    />
  );
};

export default Icon;
