import Container from "./Container";
import { render } from "@testing-library/react";

describe("Container", () => {
  it("should be able to render the container correctly", () => {
    const children = <span data-testid="span-test">A span!</span>;
    const { getByTestId } = render(<Container>{children}</Container>);
    expect(getByTestId("container")).toBeInTheDocument();
    expect(getByTestId("span-test")).toBeInTheDocument();
  });
});
