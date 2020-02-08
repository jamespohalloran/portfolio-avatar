import React from "react";
import App from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

import Router from "next/router";
import { initialPageStates } from "../helpers/pageStates";

const handleRouteChange = (url: string) => {
  const initialState = initialPageStates[url];
  document.body.setAttribute(
    "bg-state",
    initialState ? initialState.bgState : "light"
  );
};

Router.events.on("routeChangeStart", handleRouteChange);

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

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
