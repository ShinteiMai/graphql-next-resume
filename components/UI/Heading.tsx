import React from "react";
import clsx from "clsx";
import { TComponent } from "..";

interface Props extends TComponent {
  is?: "h1" | "h2" | "h3";
}

const Heading = ({ is, children, className }: Props) => {
  const Tag = React.createElement(
    is || "h1",
    {
      "data-testid": "heading",
      className: clsx("text-accents-2", className),
    },
    children
  );
  return Tag;
};

export default Heading;
