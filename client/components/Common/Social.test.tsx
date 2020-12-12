import { render } from "@testing-library/react";
import Social from "./Social";

describe("Social", () => {
  it("should render the Social component correctly", () => {
    const { getByTestId } = render(<Social />);
    expect(getByTestId("social")).toBeInTheDocument();
  });
});
