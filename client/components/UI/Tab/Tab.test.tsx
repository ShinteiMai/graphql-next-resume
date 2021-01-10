import { render } from "@testing-library/react";
import Tab from "./Tab";

describe("Tab", () => {
  it("should be able to render the tab component correctly", () => {
    const text = "about";
    const { getByTestId } = render(<Tab isActive={true}>{text}</Tab>);
    expect(getByTestId("tab")).toBeInTheDocument();
    expect(getByTestId("tab")).toHaveTextContent(text);
  });
  it("should be able to handle the click event of the tab correctly", () => {});
});
