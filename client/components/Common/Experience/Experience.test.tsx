import { render } from "@testing-library/react";
import Experience from "./Experience";

describe("Experience", () => {
  it("should be able to render the Experience component", () => {
    const { getByTestId } = render(<Experience />);
    expect(getByTestId("experience"));
  });
});
