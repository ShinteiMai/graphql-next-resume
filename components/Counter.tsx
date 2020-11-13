import React, { useState } from "react";
import Button from "./Button";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div data-testid="counter" className="text-center mx-auto">
      <h2 data-testid="count" className="text-4xl font-semibold">
        {count}
      </h2>
      <div className="mt-2">
        <Button
          testId="decrement-button"
          onClick={() => setCount((c) => c - 1)}
        >
          -
        </Button>
        <Button
          testId="increment-button"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;
