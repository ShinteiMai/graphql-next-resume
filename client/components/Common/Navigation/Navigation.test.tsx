import { render } from "@testing-library/react";
import Navigation from "./Navigation";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Navigation", () => {
  it("should be able to render the Navigation component correctly", () => {
    const { getByTestId } = render(<Navigation />);
    expect(getByTestId("navigation")).toBeInTheDocument();
  });
});
