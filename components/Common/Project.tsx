import React from "react";
import { TComponent } from "..";
import Container from "../UI/Container";
import Heading from "../UI/Heading";
import Paragraph from "../UI/Paragraph";
import Video from "../UI/Video";

export type Links = {
  github: string;
  dribbble: string;
  external: string;
};

interface Props extends TComponent {
  src: string;
  title: string;
  description: string;
  technologies: number[];
  links: Links;
}

const Project = ({ src, title, description }: Props) => {
  return (
    <Container className="flex">
      <Video src={src} />
      <Container>
        <Heading>{title}</Heading>
        <Paragraph>{description}</Paragraph>
      </Container>
    </Container>
  );
};
export default Project;
