import { TComponent } from "@components/types";
import { Avatar, Button } from "@components/UI";
import React from "react";

import data from "../../../data/profile.json";
import Navigation from "../Navigation";
import Social from "../Social";

interface Props extends TComponent {}

const Sidebar = ({ className, "data-testid": testId }: Props) => {
  return (
    <div data-testid={testId || "sidebar"} className={className}>
      <Avatar className="mb-3" src={data.profilePicture} alt="Steven Hansel" />
      <h1 className="text-xl md:text-lg font-medium mb-4 md:mb-0">
        {data.name}
      </h1>
      <p className="hidden md:block mb-6 w-full md:w-3/5 lg:w-full md:mx-auto lg:mx-0 text-sm">
        {data.biography.short}
      </p>
      <div className="flex items-center justify-evenly lg:inline-block mb-4 lg:mb-0">
        <Social className="lg:mb-6 lg:mx-0 w-24" />
        <Button link={data.resume} className="lg:mb-16">
          Resume
        </Button>
      </div>

      <Navigation className="text-xl" />
    </div>
  );
};
export default Sidebar;
