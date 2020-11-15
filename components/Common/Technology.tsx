import clsx from "clsx";
import React from "react";
import { TComponent } from "..";
import Container from "../UI/Container";

interface Props extends TComponent {
  detailed?: boolean;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Technology = ({
  src,
  alt,
  className,
  "data-testid": testId,
  width,
  height,
}: Props) => {
  return (
    <Container
      data-testid={testId || "technology"}
      className={clsx("", className)}
    >
      <img
        src={src}
        alt={alt || "Technology"}
        width={`${width}px` || "50px"}
        height={`${height}px` || "50px"}
      />
    </Container>
  );
};
export default Technology;
