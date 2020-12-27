import React from "react";
import classes from "./TextLink.module.css";
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
          className={clsx(classes.newTab, className)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <span
          data-testid={testId || "text-link"}
          className={clsx(classes.default, className)}
        >
          {children}
        </span>
      )}
    </Link>
  );
};
export default TextLink;
