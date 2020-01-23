import React from "react";
import "../static/css/App.css";
import "../static/css/avatar.css";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse-flat.svg";
import { Header } from "./layout/Header";
import Link from "next/link";
import { motion } from "framer-motion";

const Post: React.FC = () => {
  return (
    <div id="posts" className="colored-sky">
      <Header />
      <div id="main-content">
        <h1>Blog</h1>
        <PostPreview />
        <PostPreview />
        <PostPreview />
      </div>
    </div>
  );
};

const backVariants = {
  exit: {},
  enter: {}
};

const PostPreview = () => (
  <motion.div initial="exit" animate="enter" exit="exit">
    <motion.div variants={backVariants}></motion.div>{" "}
    <div className="post-preview">
      <h2>This is a post</h2>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release...{" "}
      <span>
        <Link href="/post">
          <a>(read more)</a>
        </Link>
      </span>
    </div>
  </motion.div>
);

export default Post;
