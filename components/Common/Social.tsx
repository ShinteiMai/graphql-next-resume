import React from "react";
import clsx from "clsx";
import { SiGithub, SiDribbble, SiLinkedin } from "react-icons/si";
import { TComponent } from "..";
import Container from "../UI/Container";
import TextLink from "../UI/TextLink";
import Icon from "../UI/Icon";

interface Props extends TComponent {
  size?: number;
}

const Social = ({ className, size }: Props) => {
  return (
    <Container className={clsx("flex items-center justify-between", className)}>
      <TextLink href="/">
        <Icon SVG={SiGithub} size={size} />
      </TextLink>
      <TextLink href="/">
        <Icon SVG={SiDribbble} size={size} />
      </TextLink>
      <TextLink href="/">
        <Icon SVG={SiLinkedin} size={size} />
      </TextLink>
    </Container>
  );
};
export default Social;
