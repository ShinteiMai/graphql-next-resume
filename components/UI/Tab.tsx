import React from "react";
import clsx from "clsx";
import { TComponent } from "..";

interface Props extends TComponent {
  onClick?: () => void;
}

const Tab = ({ className, onClick, children }: Props) => {
  return (
    <div onClick={onClick} data-testid="tab" className={clsx("", className)}>
      {children}
    </div>
  );
};
export default Tab;
