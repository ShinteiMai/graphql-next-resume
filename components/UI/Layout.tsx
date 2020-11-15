import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => (
  <div data-testid="layout">
    <Head>
      <title>{`${title && title + " | "} Steven Hansel`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main
      data-testid="mainContainer"
      className="px-2 sm:px-4 md:px-8 lg:px-16 py-4 md:py-12 lg:py-16"
    >
      {children}
    </main>
  </div>
);

export default Layout;
