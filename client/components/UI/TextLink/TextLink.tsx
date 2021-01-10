import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { TComponent } from "@components/types";

interface Props extends TComponent {
  href: string;
  newTab?: boolean;
}

const TextLink = ({
  href,
  children,
  "data-testid": testId,
  className,
  newTab,
}: Props) => {
  return (
    <Link href={href} passHref={newTab}>
      {newTab ? (
        <a
          data-testid={testId || "text-link-new-tab"}
          className={clsx(
            "no-underline cursor-pointer transition-all duration-200 ease-in-out",
            className
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <span
          data-testid={testId || "text-link"}
          className={clsx("no-underline cursor-pointer", className)}
        >
          {children}
        </span>
      )}
    </Link>
  );
};
export default TextLink;
