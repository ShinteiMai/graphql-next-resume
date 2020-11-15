import React from "react";
import clsx from "clsx";
import { TComponent } from "..";

interface Props extends TComponent {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

const Avatar = ({ src, className, width, height, alt }: Props) => {
  return (
    <img
      className={clsx(
        "inline object-cover h-24 w-24 rounded-full text-white shadow-solid",
        className
      )}
      src={src}
      alt={alt || "Avatar"}
      width={width || "120px"}
      height={height || "120px"}
    />
  );
};
export default Avatar;
