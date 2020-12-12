import { render } from "@testing-library/react";
import List from "./List";

describe("List", () => {
  it("should be able to render the parent list component", () => {
    const { getByTestId } = render(
      <List>
        <span>Item 1</span>
        <span>Item 2</span>
      </List>
    );
    expect(getByTestId("list")).toBeInTheDocument();
    expect(getByTestId("list").children.length).toBe(2);
  });

  it("should be able to render the list item component", () => {
    const { getAllByTestId } = render(
      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </List>
    );
    expect(getAllByTestId("list-item").length).toBe(3);
  });
});
