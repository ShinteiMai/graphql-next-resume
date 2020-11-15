import React from "react";
import clsx from "clsx";
import { TComponent } from "..";

interface Props extends TComponent {
  onClick?: () => void;
  isActive: boolean;
}

const Tab = ({ className, onClick, children, isActive }: Props) => {
  return (
    <div
      onClick={onClick}
      data-testid="tab"
      className={clsx(
        {
          "text-primary": isActive,
          "font-medium": isActive,
          "transform hover:text-primary hover:-translate-y-1 hover:text-opacity-75 transition-all duration-200 ease-in-out": !isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
export default Tab;
