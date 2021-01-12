import { TComponent } from "@components/types";
import { TextLink } from "@components/UI";
import clsx from "clsx";
import React, { useState } from "react";

interface Props extends TComponent {
  detailed?: boolean;
  src: string;
  title: string;
  link: string;
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
  link,
  detailed = true,
}: Props) => {
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);

  return (
    <div
      data-testid={testId || "technology"}
      className={clsx("text-center flex flex-col items-center", className)}
    >
      <img
        src={src}
        alt={title || "Technology"}
        width={`${width}px` || "50px"}
        height={`${height}px` || "50px"}
        className={clsx(
          "cursor-pointer transform hover:-translate-y-1 transition-all duration-200 ease-in-out",
          {
            "-translate-y-1": isActivated,
          }
        )}
        onMouseEnter={() => {
          if (!isActivated) setShowTitle(true);
        }}
        onMouseLeave={() => {
          if (!isActivated) setShowTitle(false);
        }}
        onClick={() => setIsActivated(!isActivated)}
      />
    </div>
  );
};
export default Technology;
