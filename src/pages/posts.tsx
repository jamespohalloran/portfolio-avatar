import React from "react";
import "../static/css/App.css";
import "../static/css/avatar.css";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse-flat.svg";
import { Header } from "./layout/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export default function Posts({ posts }: any) {
  return (
    <div id="posts" className="colored-sky">
      <Header />
      <div id="main-content">
        <h1>Blog</h1>
        {(posts || []).map((p: any) => (
          <PostPreview {...p} />
        ))}
      </div>
    </div>
  );
}

const backVariants = {
  exit: {},
  enter: {}
};

const PostPreview = ({ post, slug }: any) => (
  <motion.div initial="exit" animate="enter" exit="exit">
    <motion.div variants={backVariants}></motion.div>{" "}
    <div className="post-preview">
      <h2>{post.data.title}</h2>
      <ReactMarkdown source={post.content} />{" "}
      <span>
        <Link href={`/blog/${slug}`}>
          <a>(read more)</a>
        </Link>
      </span>
    </div>
  </motion.div>
);

Posts.getInitialProps = async function(context: any) {
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
    fileRelativePath: `src/data/config.json`,
    posts
  };
};
