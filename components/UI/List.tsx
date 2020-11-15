import clsx from "clsx";
import React from "react";
import { TComponent } from "..";
import { BiRightArrow } from "react-icons/bi";
import Text from "./Text";
import Container from "./Container";

interface ItemProps extends TComponent {}

const Item = ({ children, className, "data-testid": testId }: ItemProps) => {
  return (
    <li
      data-testid={testId || "list-item"}
      className={clsx("mb-3 grid grid-cols-12", className)}
    >
      <Container>
        <BiRightArrow
          size={12}
          className="col-span-1 fill-current text-primary inline-block"
        />
      </Container>

      <Text className="text-sm col-span-11">{children}</Text>
    </li>
  );
};

interface ListProps extends TComponent {}

const List = ({ children, className, "data-testid": testId }: ListProps) => {
  return (
    <ul data-testid={testId || "list"} className={clsx("list-none", className)}>
      {children}
    </ul>
  );
};
List.Item = Item;
export default List;
