import React from "react";
import App from "next/app";
import "../index.css";
import Layout from "../components/UI/Layout";
import { animated, Transition } from "react-spring";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import { capitalize } from "../utils/capitalize";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const items = [
      {
        id: this.props.router.route,
        Component,
        pageProps,
      },
    ];

    return (
      <>
        <Layout>
          <Container className="relative">
            <Heading className="text-5xl font-medium hidden lg:block">
              {this.props.router.pathname.slice(1) === ""
                ? "About"
                : capitalize(this.props.router.pathname.slice(1))}
            </Heading>
            <Transition
              items={items}
              keys={(item) => item.id}
              from={{ opacity: 0, transform: "translate3d(-10%,0,0)" }}
              initial={{ opacity: 0 }}
              enter={{ opacity: 1, transform: "translate3d(0%,0,0)" }}
              leave={{
                opacity: 0,
                position: "absolute",
                transform: "translate3d(5%,0,0)",
              }}
              config={{ duration: 500 }}
            >
              {(styles, { pageProps, Component }) => (
                <animated.div
                  style={{
                    ...styles,
                    position: "absolute",
                    width: "100%",
                  }}
                >
                  <Component {...pageProps} />
                </animated.div>
              )}
            </Transition>
          </Container>
        </Layout>

        <style jsx global>
          {`
            @font-face {
              font-family: "Poppins";
              font-weight: 400;
              src: url(/fonts/poppins/Poppins-Regular.ttf);
            }
            @font-face {
              font-family: "Poppins";
              font-weight: 500;
              src: url(/fonts/poppins/Poppins-Medium.ttf);
            }
            @font-face {
              font-family: "Poppins";
              font-weight: 600;
              src: url(/fonts/poppins/Poppins-SemiBold.ttf);
            }
            @font-face {
              font-family: "Poppins";
              font-weight: 700;
              src: url(/fonts/poppins/Poppins-Bold.ttf);
            }
            @font-face {
              font-family: "Poppins";
              font-weight: 800;
              src: url(/fonts/poppins/Poppins-ExtraBold.ttf);
            }
            @font-face {
              font-family: "Poppins";
              font-weight: 900;
              src: url(/fonts/poppins/Poppins-Black.ttf);
            }

            html {
              margin: 0;
              padding: 0;
            }

            body {
              margin: 0;
              padding: 0;
              background: #323030;
              color: #cacaca;
            }
          `}
        </style>
      </>
    );
  }
}

export default MyApp;
