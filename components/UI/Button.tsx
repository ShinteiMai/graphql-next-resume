import React from "react";
import { TComponent } from "..";

interface Props extends TComponent {
  onClick?: () => void;
}

const Button = ({ children, onClick, "data-testid": testId }: Props) => {
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
      onClick={onClick}
      data-testid={testId || "button"}
    >
      {children}
    </button>
  );
};
export default Button;
