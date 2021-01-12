import React from "react";
import App from "next/app";
import "../index.css";
import Layout from "../components/UI/Layout";
import { capitalize } from "../utils/capitalize";
import { AnimatePresence, motion, Transition } from "framer-motion";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const spring: Transition = {
      type: "spring",
      damping: 20,
      stiffness: 100,
      when: "afterChildren",
    };

    return (
      <>
        <Layout>
          <div className="relative">
            <h2 className="text-5xl font-medium hidden lg:block text-accents-2">
              {this.props.router.pathname.slice(1) === ""
                ? "About"
                : capitalize(this.props.router.pathname.slice(1))}
            </h2>
            <AnimatePresence>
              <div>
                <motion.div
                  transition={spring}
                  key={router.pathname}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  id="page-transition"
                >
                  <Component {...pageProps} key={router.pathname} />
                </motion.div>
              </div>
            </AnimatePresence>
          </div>
        </Layout>

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
