import { fireEvent, render } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
  it("should be able to render the counter component without any errors", () => {
    const { getByTestId } = render(<Counter />);
    expect(getByTestId("counter")).toBeInTheDocument();
    expect(Number(getByTestId("count").textContent)).toBe(0);
    expect(getByTestId("increment-button")).toBeInTheDocument();
    expect(getByTestId("decrement-button")).toBeInTheDocument();
  });

  it("should be able to increment the count", () => {
    const { getByTestId } = render(<Counter />);

    expect(Number(getByTestId("count").textContent)).toBe(0);

    const incrementButton = getByTestId("increment-button");
    fireEvent.click(incrementButton);

    expect(Number(getByTestId("count").textContent)).toBe(1);
  });
  it("should be able to decrement the count", () => {
    const { getByTestId } = render(<Counter />);

    expect(Number(getByTestId("count").textContent)).toBe(0);

    const incrementButton = getByTestId("decrement-button");
    fireEvent.click(incrementButton);

    expect(Number(getByTestId("count").textContent)).toBe(-1);
  });
});
