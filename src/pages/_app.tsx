import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    console.log("wrapper");
    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </>
    );
  }
}

export default MyApp;
