import React from "react";
import "../static/css/App.css";
import "../static/css/avatar.css";
import Header from "./layout/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import FadeWrapper from "../helpers/FadeWrapper";
import { NextSeo } from "next-seo";

export default function Posts({ posts }: any) {
  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <NextSeo title={"Blog"} />
      <div id="posts">
        <Header />
        <FadeWrapper>
          <div id="main-content">
            <h1>Blog</h1>
            {(posts || []).map((p: any) => (
              <PostPreview {...p} />
            ))}
          </div>
        </FadeWrapper>
      </div>
      <footer />
    </motion.div>
  );
}

const PostPreview = ({ post, slug }: any) => (
  <div className="post-preview">
    <h2>{post.data.title}</h2>
    <ReactMarkdown source={post.content} />{" "}
    <span>
      <Link href={`/blog/[slug]`} as={`/blog/${slug}`}>
        <a>(read more)</a>
      </Link>
    </span>
  </div>
);

export async function unstable_getStaticProps() {
  // get all blog data for list
  const posts = (context => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key: string, index: number) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, "")
        // .replace(" ", "-")
        .split(".")
        .slice(0, -1)
        .join(".");
      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      const post = matter(value.default);
      return {
        post: {
          ...post,
          content: post.content.substring(0, 300)
        },
        slug
      };
    });
    return data;
  })((require as any).context("../content/posts", true, /\.md$/));

  return {
    props: {
      fileRelativePath: `src/data/config.json`,
      posts
    }
  };
}
