import React from "react";
import Head from "next/head";
import Sidebar from "../Common/Sidebar";
import Container from "./Container";
import { TComponent } from "..";
import { useRouter } from "next/router";
import { capitalize } from "../../utils/capitalize";

interface Props extends TComponent {}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <div data-testid="layout">
      <Head>
        <title>{`${
          router.pathname.slice(1) === ""
            ? "About"
            : capitalize(router.pathname.slice(1))
        } | Steven Hansel`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container className="flex flex-col md:flex-row px-0 sm:px-12 md:px-24 lg:px-48 py-6 md:py-12 lg:py-24 w-3/4 sm:w-full mx-auto">
        <Sidebar className="block md:fixed w-full sm:w-full md:w-56 mx-auto md:mx-0 text-center md:text-left" />
        <Container
          data-testid="mainContainer"
          className="ml-0 md:ml-56 w-full lg:w-4/6 px-0 md:px-16 lg:px-32 py-4 md:py-0"
        >
          {children}
        </Container>
      </Container>
    </div>
  );
};

export default Layout;
