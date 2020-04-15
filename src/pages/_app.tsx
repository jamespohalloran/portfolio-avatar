import React from "react";
import App from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import siteData from "../content/siteMeta.json";
import { DefaultSeo } from "next-seo";
import TagManager from "react-gtm-module";
import Router from "next/router";
import { initialPageStates } from "../helpers/pageStates";
import { TinaCMS, TinaProvider } from "tinacms";

const handleRouteChange = (url: string) => {
  const initialState = initialPageStates[url];
  document.body.setAttribute(
    "bg-state",
    initialState ? initialState.bgState : "light"
  );
};

Router.events.on("routeChangeStart", handleRouteChange);

class MyApp extends App {
  cms: any;

  componentWillMount() {
    this.cms = new TinaCMS();
  }
  componentDidMount() {
    if (process.env.NODE_ENV === "production") {
      TagManager.initialize({
        gtmId: "GTM-P47DQN9",
      });
    }
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <TinaProvider cms={this.cms}>
        <DefaultSeo
          title={siteData.seoDefaultTitle}
          titleTemplate={"%s | " + siteData.title}
          description={siteData.description}
          openGraph={{
            type: "website",
            locale: "en_CA",
            url: siteData.siteUrl,
            site_name: siteData.title,
            images: [
              {
                url: "https://johalloran.dev/img/social-share.png",
                width: 1200,
                height: 628,
                alt: `James O'Halloran`,
              },
            ],
          }}
          twitter={{
            handle: siteData.social.twitterHandle,
            site: siteData.siteUrl,
            cardType: "summary_large_image",
          }}
        />
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </TinaProvider>
    );
  }
}

export default MyApp;
