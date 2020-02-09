import React from "react";
import "../static/css/App.css";
import "../static/css/avatar.css";
import { Header } from "./layout/Header";
import { motion } from "framer-motion";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import FadeWrapper from "../helpers/FadeWrapper";

export default function Projects({ projects }: any) {
  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <div id="projects">
        <Header />
        <FadeWrapper>
          <div id="main-content">
            <h1>Select Projects</h1>
            {(projects || []).map((p: any) => (
              <ProjectPreview {...p} />
            ))}
          </div>
        </FadeWrapper>
      </div>
    </motion.div>
  );
}

const ProjectPreview = ({ project }: any) => (
  <div className="post-preview">
    <img src={project.data.banner} alt={project.data.title} />
    <h2>{project.data.title}</h2>
    <ReactMarkdown source={project.content} />{" "}
  </div>
);

Projects.getInitialProps = async function(context: any) {
  // get all blog data for list
  const projects = (context => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key: string, index: number) => {
      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      const project = matter(value.default);
      return {
        project
      };
    });
    return data;
  })((require as any).context("../content/projects", true, /\.md$/));

  return {
    fileRelativePath: `src/data/config.json`,
    projects
  };
};