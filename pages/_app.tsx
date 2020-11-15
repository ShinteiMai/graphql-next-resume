import React from "react";
import App from "next/app";
import "../index.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
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
