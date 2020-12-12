import { render } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading component", () => {
  it("should be able to render the heading component correctly", () => {
    const content = "Steven Hansel";
    const { getByTestId } = render(
      <Heading className="text-4xl">{content}</Heading>
    );
    expect(getByTestId("heading")).toBeInTheDocument();
    expect(getByTestId("heading")).toHaveTextContent(content);
  });
});
