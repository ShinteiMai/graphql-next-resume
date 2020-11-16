import { render } from "@testing-library/react";
import Trail from "./Trail";

describe("Trail", () => {
  it("should be able to render the Trail component correctly", () => {
    const { getByTestId } = render(
      <Trail open={true}>
        <span>A text</span>
      </Trail>
    );

    expect(getByTestId("trail")).toBeInTheDocument();
    expect(getByTestId("trail")).toHaveTextContent("A text");
  });
});
