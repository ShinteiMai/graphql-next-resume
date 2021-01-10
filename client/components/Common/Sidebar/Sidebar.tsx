import { TComponent } from "@components/types";
import { Avatar, Button } from "@components/UI";
import React from "react";
import { profile } from "@data/json";
import Social from "../Social";
import Navigation from "../Navigation";

interface Props extends TComponent {}

const Sidebar = ({ className, "data-testid": testId }: Props) => {
  return (
    <div data-testid={testId || "sidebar"} className={className}>
      <Avatar
        className="mb-3"
        src={profile.profilePicture}
        alt="Steven Hansel"
      />
      <h2 className="text-accents-2 text-xl md:text-lg font-medium mb-4 md:mb-0">
        {profile.name}
      </h2>
      <p className="text-sm text-accents-1 hidden md:block mb-6 w-full md:w-3/5 lg:w-full md:mx-auto lg:mx-0">
        {profile.biography.short}
      </p>
      <div className="flex items-center justify-evenly lg:inline-block mb-4 lg:mb-0">
        <Social className="lg:mb-6 lg:mx-0 w-24" />
        <Button link={profile.resume} className="lg:mb-16">
          Resume
        </Button>
      </div>

      <Navigation className="text-xl" />
    </div>
  );
};
export default Sidebar;
