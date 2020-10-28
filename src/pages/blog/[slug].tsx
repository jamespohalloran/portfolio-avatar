import React from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import matter from "gray-matter";
import { Post } from "../../components/post";
var path = require("path");

interface Props {
  content: string;
  data: { frontmatter: any };
}

export default Post;

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
  var fs = require("fs");
  const { slug } = context.params;

  const fullPath = path.resolve(
    "src/content/posts",
    `${decodeURIComponent(slug)}.md`
  );
  const file = fs.readFileSync(fullPath);
  const { orig, ...data } = matter(file);

  return {
    props: {
      ...data,
    },
  };
}
