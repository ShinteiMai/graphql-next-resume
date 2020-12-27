import React from "react";
import clsx from "clsx";
import { TComponent } from "@components/types";

interface Props extends TComponent {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

const Avatar = ({
  src,
  className,
  width,
  height,
  alt,
  "data-testid": testId,
}: Props) => {
  return (
    <img
      data-testid={testId || "avatar"}
      className={clsx(
        "inline object-cover h-32 w-32 rounded-full text-white shadow-solid",
        className
      )}
      src={src}
      alt={alt || "Avatar"}
      width={width || "150px"}
      height={height || "150px"}
    />
  );
};
export default Avatar;
