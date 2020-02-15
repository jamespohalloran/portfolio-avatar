import React from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse-flat.svg";
import { motion } from "framer-motion";
import Header from "../layout/Header";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import FadeWrapper from "../../helpers/FadeWrapper";
import { NextSeo } from "next-seo";
import { formatExcerpt, formatDate } from "../../helpers/markdownUtils";
var path = require("path");

interface Props {
  content: string;
  data: any;
}

export default function Post(props: Props) {
  const markdownBody = props.content;
  const frontmatter = props.data;

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <NextSeo
        title={frontmatter.title}
        description={formatExcerpt(markdownBody)}
      />
      <div id="post">
        <Header />
        <FadeWrapper>
          <div className="bio-blurb">
            <h1>{frontmatter.title}</h1>
          </div>
          <LighthouseBG className="lighthouse" />
          <div className="post-content">
            <div className="content-inner">
              <p>{formatDate(frontmatter.date)}</p>
              <ReactMarkdown source={markdownBody} />
            </div>
            <footer />
          </div>
        </FadeWrapper>
      </div>
    </motion.div>
  );
}

export async function unstable_getStaticPaths() {
  const fg = require("fast-glob");
  const fullPath = path.resolve("src/content/posts/**/*.md");
  const blogs = await fg(fullPath);

  return blogs.map((file: string) => {
    const slug = file
      .split("/posts/")[1]
      .replace(/ /g, "-")
      .slice(0, -3)
      .trim();

    return { params: { slug } };
  });
}

export async function unstable_getStaticProps(context: any) {
  var fs = require("fs");
  const { slug } = context.params;

  const fullPath = path.resolve(
    "src/content/posts",
    `${decodeURIComponent(slug)}.md`
  );
  const file = fs.readFileSync(fullPath);
  const data = matter(file);

  return {
    props: {
      ...data
    }
  };
}
