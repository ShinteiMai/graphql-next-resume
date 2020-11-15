import React from "react";
import { TComponent } from "..";
import Container from "../UI/Container";
import Tab from "../UI/Tab";

interface Props extends TComponent {}

const Navigation = ({}: Props) => {
  return (
    <Container>
      <Tab>About</Tab>
      <Tab>Projects</Tab>
      <Tab>Contact</Tab>
    </Container>
  );
};

export default Navigation;
