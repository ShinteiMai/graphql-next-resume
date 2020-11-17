import React from "react";
import { TComponent } from "..";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Heading from "../UI/Heading";
import Paragraph from "../UI/Paragraph";
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
      <Paragraph className="hidden md:block mb-6 w-full md:w-3/5 lg:w-full md:mx-auto lg:mx-0">
        {data.biography.short}
      </Paragraph>
      <Container className="flex items-center justify-evenly lg:inline-block mb-4 lg:mb-0">
        <Social className="lg:mb-6 lg:mx-0 w-24" />
        <Button link={data.resume} className="lg:mb-16">
          Resume
        </Button>
      </Container>

      <Navigation className="text-xl" />
    </Container>
  );
};
export default Sidebar;
