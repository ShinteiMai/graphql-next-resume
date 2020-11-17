import React from "react";
import { SiDribbble, SiGithub } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import { TComponent } from "..";
import Container from "../UI/Container";
import Icon from "../UI/Icon";
import TextLink from "../UI/TextLink";
import clsx from "clsx";

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
    <Container
      data-testid={testId || "links"}
      className={clsx("flex items-center", className)}
    >
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
      {external && (
        <TextLink className="mr-4" newTab href={external}>
          <Icon SVG={BiLinkExternal} size={SIZE} />
        </TextLink>
      )}
    </Container>
  );
};

export default Links;
