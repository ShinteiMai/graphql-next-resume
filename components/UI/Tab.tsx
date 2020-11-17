import React from "react";
import clsx from "clsx";
import { TComponent } from "..";
import Divider from "./Divider";
import Container from "./Container";

interface Props extends TComponent {
  onClick?: () => void;
  isActive: boolean;
  divider?: boolean;
}

const Tab = ({
  className,
  onClick,
  children,
  isActive,
  divider = true,
}: Props) => {
  return (
    <Container className="flex">
      {isActive && divider && (
        <Divider className={clsx("hidden lg:block", {})} height={36} />
      )}
      <div
        onClick={onClick}
        data-testid="tab"
        className={clsx(
          "inline-block ml-0 md:ml-3 md:flex md:items-center",
          {
            "text-primary": isActive,
            "font-medium": isActive,
            "transform hover:text-primary hover:-translate-y-1 hover:text-opacity-75 transition-all duration-200 ease-in-out": !isActive,
            "border-b border-primary": isActive,
            "md:border-0": isActive && divider,
          },
          className
        )}
      >
        {children}
      </div>
    </Container>
  );
};
export default Tab;
