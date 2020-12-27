import { render } from "@testing-library/react";
import { SiGithub } from "react-icons/si";
import Icon from "./Icon";

describe("Icon", () => {
  it("should be able to render the SVG icon", () => {
    const { getByTestId } = render(<Icon SVG={SiGithub} />);
    expect(getByTestId("icon")).toBeInTheDocument();
  });
});
