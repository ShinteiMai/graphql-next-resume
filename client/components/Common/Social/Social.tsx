import React from "react";
import clsx from "clsx";
import { SiGithub, SiDribbble, SiLinkedin } from "react-icons/si";
import { TComponent } from "@components/types";
import TextLink from "@components/UI/TextLink";
import data from "../../../data/profile.json";
import { Icon } from "@components/UI";

interface Props extends TComponent {
  size?: number;
}

const Social = ({ className, size, "data-testid": testId }: Props) => {
  return (
    <div
      data-testid={testId || "social"}
      className={clsx("flex items-center justify-between", className)}
    >
      <TextLink newTab href={data.social.github}>
        <Icon SVG={SiGithub} size={size} />
      </TextLink>
      <TextLink newTab href={data.social.dribbbble}>
        <Icon SVG={SiDribbble} size={size} />
      </TextLink>
      <TextLink newTab href={data.social.linkedin}>
        <Icon SVG={SiLinkedin} size={size} />
      </TextLink>
    </div>
  );
};
export default Social;
