import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";

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

describe("Sidebar", () => {
  it("should be able to render the Sidebar and it's children", () => {
    const { getByTestId } = render(<Sidebar />);
    expect(getByTestId("sidebar")).toBeInTheDocument();
  });
});
