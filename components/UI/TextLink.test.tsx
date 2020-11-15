import TextLink from "./TextLink";
import { render } from "@testing-library/react";

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

describe("Text Link", () => {
  it("should be able to render the TextLink component", () => {
    const content = "about";
    const { getByTestId } = render(
      <TextLink href="/about">{content}</TextLink>
    );
    expect(getByTestId("text-link")).toBeInTheDocument();
    expect(getByTestId("text-link")).toHaveTextContent(content);
  });
});
