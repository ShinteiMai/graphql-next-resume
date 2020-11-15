import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { TComponent } from "..";

interface Props extends TComponent {
  href: string;
}

const TextLink = ({
  href,
  children,
  "data-testid": testId,
  className,
}: Props) => {
  return (
    <Link href={href}>
      <span
        data-testid={testId || "text-link"}
        className={clsx("no-underline cursor-pointer", className)}
      >
        {children}
      </span>
    </Link>
  );
};
export default TextLink;
