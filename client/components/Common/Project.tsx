import React from "react";
import { TComponent } from "..";
import Container from "../UI/Container";
import Heading from "../UI/Heading";
import Paragraph from "../UI/Paragraph";
import Video from "../UI/Video";
import Technology from "./Technology";
import data from "../../data/technologies.json";
import Links from "./Links";
import clsx from "clsx";

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

const Project = ({
  src,
  title,
  description,
  technologies,
  links,
  className,
}: Props) => {
  const tech = data.technologies.filter((t) => technologies.includes(t.id));

  return (
    <Container className={clsx("block lg:flex space-between", className)}>
      <Video src={src} />
      <Container className="flex flex-col ml-0 lg:ml-6 mt-3 lg:mt-0">
        <Container className="flex justify-between items-center mb-3">
          <Heading className="text-2xl font-medium lg:mb-0">{title}</Heading>
          <Container className="flex items-center">
            {tech.map((t) => (
              <Technology
                detailed={false}
                src={t.thumbnail}
                link={t.link}
                key={t.id}
                title={t.title}
                width={30}
                height={30}
                className="mr-3"
              />
            ))}
          </Container>
        </Container>
        <Paragraph className="block mb-4 lg:mb-0">{description}</Paragraph>
        <Links {...links} className="w-24 mt-0 md:mt-3 lg:mt-auto" />
      </Container>
    </Container>
  );
};
export default Project;
