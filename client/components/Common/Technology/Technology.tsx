import React, { useState } from "react";
import clsx from "clsx";
import classes from "./Technology.module.css";
import { TComponent } from "@components/types";
import Trail from "../Trail";
import { TextLink } from "@components/UI";

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
      className={clsx(classes.container, className)}
    >
      <img
        src={src}
        alt={title || "Technology"}
        width={`${width}px` || "50px"}
        height={`${height}px` || "50px"}
        className={clsx(classes.img, {
          [classes.imgActive]: isActivated,
        })}
        onMouseEnter={() => {
          if (!isActivated) setShowTitle(true);
        }}
        onMouseLeave={() => {
          if (!isActivated) setShowTitle(false);
        }}
        onClick={() => setIsActivated(!isActivated)}
      />
      {detailed && (
        <Trail open={showTitle}>
          <TextLink newTab href={link} className={classes.link}>
            @{title}
          </TextLink>
        </Trail>
      )}
    </div>
  );
};
export default Technology;
