import React from "react";
import Head from "next/head";
import { TComponent } from "@components/types";
import Sidebar from "@components/Common/Sidebar";

interface Props extends TComponent {}

const Layout = ({ children }: Props) => {
  return (
    <div data-testid="layout">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Steven Hansel</title>
        <link rel="shortcut icon" href="/images/typescript.png" />
        <meta name="title" content="Steven Hansel" />
        <meta
          name="description"
          content="a passionate software engineer building robust web & mobile applications. Interested in TypeScript, React, NestJS & GraphQL. "
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stevenhansel.com/" />
        <meta property="og:title" content="Steven Hansel" />
        <meta
          property="og:description"
          content="a passionate software engineer building robust web & mobile applications. Interested in TypeScript, React, NestJS & GraphQL. "
        />
        <meta
          property="og:image"
          content="https://stevenhansel.s3-ap-southeast-1.amazonaws.com/profile.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://stevenhansel.com/" />
        <meta property="twitter:title" content="Steven Hansel" />
        <meta
          property="twitter:description"
          content="a passionate software engineer building robust web & mobile applications. Interested in TypeScript, React, NestJS & GraphQL. "
        />
        <meta
          property="twitter:image"
          content="https://stevenhansel.s3-ap-southeast-1.amazonaws.com/profile.png"
        />
      </Head>
      <div className="flex flex-col lg:flex-row px-2 sm:px-12 md:px-24 lg:px-48 py-6 md:py-12 lg:py-24 w-11/12 mx-auto">
        <Sidebar className="block lg:fixed w-full lg:w-56 mx-auto lg:mx-0 text-center lg:text-left" />
        <div
          data-testid="mainContainer"
          className="ml-0 lg:ml-84 w-full lg:w-full px-0 lg:px-6 py-4 md:py-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
