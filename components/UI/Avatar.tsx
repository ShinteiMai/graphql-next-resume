import React from "react";
import Image from "next/image";
import { TComponent } from "..";

interface Props extends TComponent {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

const Avatar = ({ src, width, height }: Props) => {
  return (
    <Image
      priority
      src={src}
      alt="Avatar"
      width={width ?? "120px"}
      height={height ?? "120px"}
    />
  );
};
export default Avatar;
