import { render } from "@testing-library/react";
import Technology from "./Technology";

describe("Technology", () => {
  it("should render the technology component correctly", () => {
    const { getByTestId } = render(<Technology src="/images/chakraui.png" />);
    expect(getByTestId("technology")).toBeInTheDocument();
  });
});
