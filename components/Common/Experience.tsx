import React, { useState } from "react";
import { TComponent } from "..";
import Container from "../UI/Container";
import data from "../../data/profile.json";
import technologyData from "../../data/technologies.json";
import Tab from "../UI/Tab";
import Paragraph from "../UI/Paragraph";
import Heading from "../UI/Heading";
import List from "../UI/List";
import TextLink from "../UI/TextLink";
import Text from "../UI/Text";
import Technology from "./Technology";

interface Props extends TComponent {}

const Experience = ({}: Props) => {
  const [activeExperience, setActiveExperience] = useState<number>(0);

  const details = data.experience[activeExperience];
  const tech = technologyData.technologies.filter((t) =>
    details.technologies.includes(t.id)
  );

  return (
    <Container data-testid="experience" className="flex flex-col md:flex-row">
      <Container className="mr-0 md:mr-24 mt-2 mb-4 md:mb-0">
        {data.experience.map(({ company }, index) => (
          <Tab
            key={`experience-tab-${index}`}
            onClick={() => setActiveExperience(index)}
            isActive={index === activeExperience}
          >
            {company}
          </Tab>
        ))}
      </Container>
      <Container>
        <Heading className="text-lg font-medium">
          {details.role}{" "}
          <TextLink newTab href={details.link} className="text-lg text-primary">
            @{details.company}
          </TextLink>
        </Heading>
        <Paragraph>
          {details.time.start} - {details.time.end}
        </Paragraph>
        <List className="mt-4">
          {details.points.map((point, index) => (
            <List.Item key={`experience-${activeExperience}-point-${index}`}>
              {point}
            </List.Item>
          ))}
        </List>
        <Container className="mt-4s">
          <Text className="text-sm flex items-end justify-between">
            Technologies:
            <Container className="flex flex-wrap mt-2">
              {tech.map(({ id, thumbnail, title }) => (
                <Technology
                  detailed={false}
                  src={thumbnail}
                  title={title}
                  key={id}
                  className="mr-3"
                  width={30}
                  height={30}
                />
              ))}
            </Container>
          </Text>
        </Container>
      </Container>
    </Container>
  );
};

export default Experience;
