import React from "react";
import { SiDribbble, SiGithub } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import clsx from "clsx";
import { TComponent } from "@components/types";
import { Icon, TextLink } from "@components/UI";

interface Props extends TComponent {
  github?: string;
  dribbble?: string;
  external?: string;
}

const SIZE = 30;

const Links = ({
  "data-testid": testId,
  github,
  dribbble,
  external,
  className,
}: Props) => {
  return (
    <div
      data-testid={testId || "links"}
      className={clsx("flex items-center", className)}
    >
      {external && (
        <TextLink className="mr-4" newTab href={external}>
          <Icon SVG={BiLinkExternal} size={SIZE} />
        </TextLink>
      )}
      {github && (
        <TextLink className="mr-4" newTab href={github}>
          <Icon SVG={SiGithub} size={SIZE} />
        </TextLink>
      )}
      {dribbble && (
        <TextLink className="mr-4" newTab href={dribbble}>
          <Icon SVG={SiDribbble} size={SIZE} />
        </TextLink>
      )}
    </div>
  );
};

export default Links;
