import React from "react";
import classes from "./Project.module.css";
import { TComponent } from "../../types";
import data from "../../../data/technologies.json";
import clsx from "clsx";
import { Video } from "@components/UI";
import Technology from "../Technology";
import Links from "../Links";

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
    <div className={clsx(classes.container, className)}>
      <Video src={src} />
      <div className={classes.projectContainer}>
        <div className={classes.headingContainer}>
          <h1 className={classes.title}>{title}</h1>
          <div className={classes.technology}>
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
        <p className={classes.description}>{description}</p>
        <Links {...links} className={classes.links} />
      </div>
    </div>
  );
};
export default Project;
