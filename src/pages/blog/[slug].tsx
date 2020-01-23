import React, { useEffect } from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse-flat.svg";
import { motion } from "framer-motion";
import { Header } from "../layout/Header";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const backVariants = {
  exit: {},
  enter: {}
};

interface Props {
  content: string;
  data: any;
}

export default function Post(props: Props) {
  const markdownBody = props.content;
  const frontmatter = props.data;

  console.log(props);

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div variants={backVariants}></motion.div>
      <div id="post" className="colored-sky">
        <Header />
        <div className="bio-blurb">
          <h2>{frontmatter.title}</h2>
        </div>
        <LighthouseBG className="lighthouse" />
        <div className="post-content">
          <ReactMarkdown source={markdownBody} />
        </div>
      </div>
    </motion.div>
  );
}

Post.getInitialProps = async function(context: any) {
  const { slug } = context.query;
  const content = await import(`../../content/posts/${slug}.md`);

  const data = matter(content.default);
  console.log(data);
  return {
    ...data
  };
};
