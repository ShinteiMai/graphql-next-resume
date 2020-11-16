import clsx from "clsx";
import React, { useState } from "react";
import { TComponent } from "..";
import Container from "../UI/Container";

import TextLink from "../UI/TextLink";
import Trail from "./Trail";

interface Props extends TComponent {
  detailed?: boolean;
  src: string;
  title: string;
  width?: number;
  height?: number;
}

const Technology = ({
  src,
  title,
  className,
  "data-testid": testId,
  width,
  height,
  detailed = true,
}: Props) => {
  const [showTitle, setShowTitle] = useState<boolean>(false);
  return (
    <Container
      data-testid={testId || "technology"}
      className={clsx("text-center flex flex-col items-center", className)}
    >
      <img
        src={src}
        alt={title || "Technology"}
        width={`${width}px` || "50px"}
        height={`${height}px` || "50px"}
        className="transform hover:-translate-y-1 transition-all duration-200 ease-in-out"
        onMouseEnter={() => setShowTitle(true)}
        onMouseLeave={() => setShowTitle(false)}
      />
      {detailed && (
        <Trail open={showTitle}>
          <TextLink href="/" className="mt-auto text-xs text-primary">
            @{title}
          </TextLink>
        </Trail>
      )}
    </Container>
  );
};
export default Technology;
