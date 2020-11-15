import React from "react";
import App from "next/app";
import "../index.css";
import Layout from "../components/UI/Layout";
import { animated, useTransition, UseTransitionResult } from "react-spring";
import { NextComponentType, NextPageContext } from "next";

interface Props {
  children: ({
    transitions,
  }: {
    transitions: UseTransitionResult<any, any>[];
  }) => JSX.Element;
  items: {
    id: string;
    Component: NextComponentType<NextPageContext, any, {}>;
    pageProps: any;
  }[];
}

const PageContainer = ({ children, items }: Props) => {
  const transitions = useTransition(items, (p) => p.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 1000,
    },
  });
  return children({
    transitions,
  });
};

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
          <div style={{ position: "relative" }}>
            <PageContainer items={items}>
              {({ transitions }) => (
                <>
                  {transitions.map(({ item, props, key }) => (
                    <animated.div
                      key={key}
                      style={{
                        ...props,
                        position: "absolute",
                        width: "100%",
                      }}
                    >
                      <Component {...item.pageProps} />
                    </animated.div>
                  ))}
                </>
              )}
            </PageContainer>
          </div>
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
