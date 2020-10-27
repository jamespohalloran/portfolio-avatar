import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import React from "react";
import ReactMarkdown from "react-markdown";
import FadeWrapper from "../helpers/FadeWrapper";
import { formatDate, formatExcerpt } from "../helpers/markdownUtils";
import Header from "../pages/layout/Header";
import { ReactComponent as LighthouseBG } from "../static/lighthouse-flat.svg";

interface Props {
  content: string;
  data: any;
}

export function Post(props: Props) {
  const markdownBody = props.content;
  const frontmatter = props.data;

  if (!frontmatter) {
    return <div />;
  }

  const excerpt = formatExcerpt(markdownBody);
  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <NextSeo
        title={frontmatter.title}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [
            {
              url: "https://johalloran.dev/img/SelfAvatar307.jpg",
              width: 614,
              height: 307,
              alt: `James O'Halloran`,
            },
          ],
        }}
      />
      <div id="post">
        <Header />
        <FadeWrapper>
          <div className="bio-blurb">{/* <h1>{frontmatter.title}</h1> */}</div>
          <LighthouseBG className="lighthouse" />
          <div className="post-content">
            <div className="content-inner">
              <p>{formatDate(frontmatter.date)}</p>
              <h1>{frontmatter.title}</h1>
              <ReactMarkdown source={markdownBody} />
            </div>
            <footer />
          </div>
        </FadeWrapper>
      </div>
    </motion.div>
  );
}
