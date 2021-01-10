import { TComponent } from "@components/types";
import { Tab, TextLink } from "@components/UI";
import { profile, technologies } from "@data/json";
import React, { useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import Technology from "../Technology";

interface Props extends TComponent {}

const Experience = ({}: Props) => {
  const [activeExperience, setActiveExperience] = useState<number>(0);

  const details = profile.experience[activeExperience];
  const tech = technologies.technologies.filter((t) =>
    details.technologies.includes(t.id)
  );

  return (
    <div data-testid="experience" className="flex flex-col md:flex-row">
      <div className="mr-0 md:mr-24 mt-2 mb-4 md:mb-0">
        {profile.experience.map(({ company }, index) => (
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
        <h2 className="text-lg text-accents-2 font-medium">
          {details.role}{" "}
          <TextLink newTab href={details.link} className="text-lg text-primary">
            @{details.company}
          </TextLink>
        </h2>
        <p className="text-sm text-accents-1">
          {details.time.start} - {details.time.end}
        </p>
        <ul className="mt-4 list-none">
          {details.points.map((point, index) => (
            <li
              className="mb-3 flex items-center"
              key={`experience-${activeExperience}`}
            >
              <div className="mr-3">
                <BiRightArrow
                  size={12}
                  className="fill-current text-primary inline-block"
                />
              </div>
              <span className="text-sm text-accents-1">{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4s">
          <span className="text-accents-1 text-sm flex items-end justify-between">
            Technologies:
            <div className="flex flex-wrap mt-2">
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
