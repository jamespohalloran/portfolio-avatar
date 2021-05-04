import React from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse-flat.svg";
import { motion } from "framer-motion";
import Header from "../layout/Header";
import ReactMarkdown from "react-markdown";
import FadeWrapper from "../../helpers/FadeWrapper";
import { NextSeo } from "next-seo";
import { formatExcerpt, formatDate } from "../../helpers/markdownUtils";
var path = require("path");
import { LocalClient } from "tina-graphql-gateway";
import { Posts_Document, Query } from "../../../.tina/__generated__/types";

export type PostQueryResponseType = {
  getPostsDocument: Posts_Document;
};

export const query = (gql: any) => gql`
  query BlogPostQuery($relativePath: String!) {
    getPostsDocument(relativePath: $relativePath) {
      data {
        __typename
        ... on Post_Doc_Data {
          title
          date
          _body
        }
      }
    }
  }
`;

export default function Post(props: PostQueryResponseType) {
  if (!props.getPostsDocument?.data) {
    return <div />;
  }

  const pageData = props.getPostsDocument.data!;
  const markdownBody = pageData._body!;
  const excerpt = formatExcerpt(markdownBody);
  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <NextSeo
        title={pageData.title!}
        description={excerpt}
        openGraph={{
          title: pageData.title!,
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
              <p>{formatDate(pageData.date!)}</p>
              <h1>{pageData.title!}</h1>
              <ReactMarkdown source={markdownBody} />
            </div>
            <footer />
          </div>
        </FadeWrapper>
      </div>
    </motion.div>
  );
}

export const getStaticPaths = async function () {
  const fg = require("fast-glob");
  const fullPath = path.resolve("src/content/posts/**/*.md");
  const blogs = await fg(fullPath);
  return {
    paths: blogs.map((file: string) => {
      const slug = file
        .split("/posts/")[1]
        .replace(/ /g, "-")
        .slice(0, -3)
        .trim();

      return { params: { slug } };
    }),
    fallback: true,
  };
};

export async function getStaticProps(context: any) {
  const client = new LocalClient();
  const { slug } = context.params;

  const content = await client.request<Query>(query, {
    variables: { relativePath: `${slug}.md` },
  });

  return {
    props: content,
  };
}
