import React from "react";
import Head from "next/head";
import Sidebar from "../Common/Sidebar";
import Container from "./Container";
import { TComponent } from "..";

interface Props extends TComponent {}

const Layout = ({ children }: Props) => {
  return (
    <div data-testid="layout">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Steven Hansel</title>
        <meta name="title" content="Steven Hansel" />
        <meta
          name="description"
          content="a passionate software engineer building robust web & mobile applications. Interested in TypeScript, React, NestJS & GraphQL. "
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Steven Hansel" />
        <meta
          property="og:description"
          content="a passionate software engineer building robust web & mobile applications. Interested in TypeScript, React, NestJS & GraphQL. "
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Steven Hansel" />
        <meta
          property="twitter:description"
          content="a passionate software engineer building robust web & mobile applications. Interested in TypeScript, React, NestJS & GraphQL. "
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png "
        />
      </Head>
      <Container className="flex flex-col lg:flex-row px-0 sm:px-12 md:px-24 lg:px-48 py-6 md:py-12 lg:py-24 w-3/4 sm:w-full mx-auto">
        <Sidebar className="block lg:fixed w-full lg:w-56 mx-auto lg:mx-0 text-center lg:text-left" />
        <Container
          data-testid="mainContainer"
          className="ml-0 lg:ml-84 w-full lg:w-full px-0 lg:px-6 py-4 md:py-0"
        >
          {children}
        </Container>
      </Container>
    </div>
  );
};

export default Layout;
