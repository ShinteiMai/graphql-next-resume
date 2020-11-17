import React from "react";
import { useTrail, animated } from "react-spring";
import { TComponent } from "..";

interface Props extends TComponent {
  children: React.ReactNode;
  open: boolean;
  className?: string;
}

const Trail = ({
  open,
  children,
  className,
  "data-testid": testId,
  ...props
}: Props) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    height: open ? "110px" : 0,
    from: { x: 20, height: 0 },
  });
  return (
    <div data-testid={testId || "trail"} {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={index}
            style={{
              ...rest,
              transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <animated.div className={className}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Trail;
