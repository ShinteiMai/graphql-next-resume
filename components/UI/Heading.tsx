import React from "react";
import clsx from "clsx";

type Props = {
  is?: "h1" | "h2" | "h3";
  children?: React.ReactNode;
  className?: string;
};

const Heading = ({ is, children, className }: Props) => {
  const Tag = React.createElement(
    is || "h1",
    {
      "data-testid": "heading",
      className: clsx("text-3xl", className),
    },
    children
  );
  return Tag;
};

export default Heading;
