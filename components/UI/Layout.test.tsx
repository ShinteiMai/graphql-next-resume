import { render } from "@testing-library/react";
import Layout from "./Layout";

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

describe("Layout component", () => {
  it("should be able to render the layout component correctly", () => {
    const { getByTestId } = render(<Layout></Layout>);
    expect(getByTestId("layout")).toBeInTheDocument();
    expect(getByTestId("mainContainer")).toBeInTheDocument();
  });
});
