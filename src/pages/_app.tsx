import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import siteData from "../content/siteMeta.json";
import { DefaultSeo } from "next-seo";
import TagManager from "react-gtm-module";
import Router from "next/router";
import { initialPageStates } from "../helpers/pageStates";
import { TinaCMS, TinaProvider } from "tinacms";
import { GithubClient } from "react-tinacms-github";
import { TinacmsGithubProvider } from "react-tinacms-github";
import { EditLink } from "../helpers/EditLink";

const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname;
  });
};

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

const REPO_FULL_NAME = process.env.REPO_FULL_NAME as string; // e.g: tinacms/tinacms.org

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
    this.cms = new TinaCMS({
      sidebar: {
        hidden: !this.props.pageProps.preview,
      },
      apis: {
        github: new GithubClient("/api/proxy-github", REPO_FULL_NAME),
      },
      // ... any other tina config
    });
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
        <TinacmsGithubProvider
          clientId={process.env.GITHUB_CLIENT_ID || ""}
          authCallbackRoute="/api/create-github-access-token"
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          error={pageProps.error}
        >
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
          <EditLink isEditing={pageProps.preview} />
        </TinacmsGithubProvider>
      </TinaProvider>
    );
  }
}

export default MyApp;
