import React from "react";
import Head from "next/head";
import Sidebar from "../Common/Sidebar";
import Container from "./Container";
import { TComponent } from "..";

interface Props extends TComponent {
  title?: string;
}

const Layout = ({ children, title }: Props) => (
  <div data-testid="layout">
    <Head>
      <title>{`${title && title + " | "} Steven Hansel`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container className="flex px-6 sm:px-12:px-24 lg:px-48 py-6 md:py-12 lg:py-24">
      <Sidebar className="block md:fixed w-full sm:w-3/4 md:w-56 mx-auto md:mx-0 text-center md:text-left" />
      <Container data-testid="mainContainer" className="">
        {children}
      </Container>
    </Container>
  </div>
);

export default Layout;
