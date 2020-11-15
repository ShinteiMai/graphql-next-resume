import { render } from "@testing-library/react";
import React from "react";
import Text from "./Text";

describe("Text component", () => {
  it("should be able to render the text component correctly", () => {
    const content = "test";
    const { getByTestId } = render(<Text>{content}</Text>);
    expect(getByTestId("text")).toBeInTheDocument();
    expect(getByTestId("text")).toHaveTextContent(content);
  });
});
