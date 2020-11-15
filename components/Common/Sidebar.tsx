import React from "react";
import { TComponent } from "..";
import Button from "../UI/Button";
import Container from "../UI/Container";
import Heading from "../UI/Heading";
import Paragraph from "../UI/Paragraph";
import Navigation from "./Navigation";

interface Props extends TComponent {}

const Sidebar = ({}: Props) => {
  return (
    <Container>
      <Heading>Steven Hansel</Heading>
      <Paragraph>
        a passionate software engineer building robust web & mobile
        applications. Interested at TypeScript, React, Node.js & GraphQL
      </Paragraph>
      <Container></Container>
      <Button>Resume</Button>
      <Navigation />
    </Container>
  );
};
export default Sidebar;
