import React, { useState } from "react";
import classes from "./Experience.module.css";

import { BiRightArrow } from "react-icons/bi";

import data from "../../../data/profile.json";
import technologyData from "../../../data/technologies.json";

import Technology from "../Technology/Technology";
import { TComponent } from "@components/types";
import { Tab, TextLink } from "@components/UI";

interface Props extends TComponent {}

const Experience = ({}: Props) => {
  const [activeExperience, setActiveExperience] = useState<number>(0);

  const details = data.experience[activeExperience];
  const tech = technologyData.technologies.filter((t) =>
    details.technologies.includes(t.id)
  );

  return (
    <div data-testid="experience" className={classes.container}>
      <div className={classes.experienceContainer}>
        {data.experience.map(({ company }, index) => (
          <Tab
            key={`experience-tab-${index}`}
            onClick={() => setActiveExperience(index)}
            isActive={index === activeExperience}
          >
            {company}
          </Tab>
        ))}
      </div>
      <div>
        <h1 className={classes.title}>
          {details.role}{" "}
          <TextLink newTab href={details.link} className={classes.company}>
            @{details.company}
          </TextLink>
        </h1>
        <p>
          {details.time.start} - {details.time.end}
        </p>
        <ul className={classes.subContainer}>
          {details.points.map((point, index) => (
            <li
              key={`experience-${activeExperience}-point-${index}`}
              className={classes.pointContainer}
            >
              <div>
                <BiRightArrow size={12} className={classes.pointArrow} />
              </div>

              <span className={classes.pointText}>{point}</span>
            </li>
          ))}
        </ul>
        <div className={classes.subContainer}>
          <span className={classes.techologyContainer}>
            Technologies:
            <div className={classes.technology}>
              {tech.map(({ id, thumbnail, title, link }) => (
                <Technology
                  detailed={false}
                  src={thumbnail}
                  title={title}
                  link={link}
                  key={id}
                  className="mr-3"
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Experience;
