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
        "",
        {
          "text-primary": isActive,
          "font-medium": isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
export default Tab;
