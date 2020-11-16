import React from "react";
import { TComponent } from "..";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Heading from "../UI/Heading";
import Paragraph from "../UI/Paragraph";
import TextLink from "../UI/TextLink";
import Navigation from "./Navigation";
import Social from "./Social";

import data from "../../data/profile.json";

interface Props extends TComponent {}

const Sidebar = ({ className, "data-testid": testId }: Props) => {
  return (
    <Container data-testid={testId || "sidebar"} className={className}>
      <Avatar className="mb-3" src={data.profilePicture} alt="Steven Hansel" />
      <Heading className="text-xl md:text-lg font-medium mb-4 md:mb-0">
        {data.name}
      </Heading>
      <Paragraph className="hidden md:block mb-6">
        {data.biography.short}
      </Paragraph>
      <Container className="flex items-center justify-evenly md:inline-block mb-4 md:mb-0">
        <Social className="md:mb-6 md:mx-0 w-24" />
        <Button className="md:mb-16">
          <TextLink newTab href={data.resume}>
            Resume
          </TextLink>
        </Button>
      </Container>

      <Navigation className="text-xl" />
    </Container>
  );
};
export default Sidebar;
