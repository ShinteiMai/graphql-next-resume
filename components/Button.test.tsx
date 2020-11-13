import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import Button from "./Button";

const Component = () => {
  const [isShown, setisShown] = useState<boolean>(true);
  return (
    <div>
      <Button onClick={() => setisShown((s) => !s)}>
        {isShown ? "Hide text" : "Show text"}
      </Button>
    </div>
  );
};

describe("Button Component", () => {
  it("should render the button without any errors", () => {
    const { queryByTestId } = render(<Button>Click me!</Button>);
    expect(queryByTestId("button")).toBeInTheDocument();
  });

  it("should render the children correctly", () => {
    const content = "+";
    const { queryByTestId } = render(
      <Button>
        <span data-testid="test-span">{content}</span>
      </Button>
    );
    expect(queryByTestId("test-span")).toHaveTextContent(content);
  });

  it("should handle the click event correctly", () => {
    const { queryByTestId } = render(<Component />);
    const button = queryByTestId("button");
    expect(button).toHaveTextContent("Hide text");
    if (button) {
      fireEvent.click(button);
      expect(button).toHaveTextContent("Show text");
    }
  });
});
