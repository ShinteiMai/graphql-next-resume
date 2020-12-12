import { render } from "@testing-library/react";
import Paragraph from "./Paragraph";

describe("Paragraph", () => {
  it("should be able to render the paragraph component correctly", () => {
    const content = "A software engineer";
    const { getByTestId } = render(
      <Paragraph className="text-lg">{content}</Paragraph>
    );
    expect(getByTestId("paragraph")).toBeInTheDocument();
    expect(getByTestId("paragraph")).toHaveTextContent(content);
  });
});
