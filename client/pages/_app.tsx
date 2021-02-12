import React from 'react';
import App from 'next/app';
import '../index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Component {...pageProps} key={router.pathname} />

        <style jsx global>
          {`
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
