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

interface Props extends TComponent {}

const Sidebar = ({ className, "data-testid": testId }: Props) => {
  return (
    <Container data-testid={testId || "sidebar"} className={className}>
      <Avatar
        className="mb-3"
        src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        alt="Steven Hansel"
      />
      <Heading className="text-xl md:text-lg font-medium mb-3 md:mb-0">
        Steven Hansel
      </Heading>
      <Paragraph className="hidden md:block mb-6">
        a passionate software engineer building robust web & mobile
        applications. Interested in TypeScript, React, NestJS & GraphQL
      </Paragraph>
      <Container className="flex items-center justify-evenly md:inline-block mb-4 md:mb-0">
        <Social className="md:mb-6 md:mx-0 w-24" />
        <Button className="md:mb-16">
          <TextLink href="/">Resume</TextLink>
        </Button>
      </Container>

      <Navigation className="text-xl" />
    </Container>
  );
};
export default Sidebar;
