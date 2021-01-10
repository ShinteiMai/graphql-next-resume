import React from "react";
import clsx from "clsx";
import { TComponent } from "@components/types";
import { Video } from "@components/UI";
import Technology from "../Technology";
import Links from "../Links";
import { technologies as data } from "@data/json";

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
    <div className={clsx("block lg:flex space-between", className)}>
      <Video src={src} />
      <div className="flex flex-col ml-0 lg:ml-6 mt-3 lg:mt-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl text-accents-2 font-medium lg:mb-0">
            {title}
          </h2>
          <div className="flex items-center">
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
          </div>
        </div>
        <p className="text-sm text-accents-1 block mb-4 lg:mb-0">
          {description}
        </p>
        <Links {...links} className="w-24 mt-0 md:mt-3 lg:mt-auto" />
      </div>
    </div>
  );
};
export default Project;
