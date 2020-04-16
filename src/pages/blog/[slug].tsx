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
import { InlineForm, InlineWysiwyg } from "react-tinacms-inline";
import { getGithubPreviewProps, GithubPreviewProps } from "next-tinacms-github";
import {
  useGithubMarkdownForm,
  useGithubErrorListener,
} from "react-tinacms-github";

var path = require("path");

interface Props {
  content: string;
  data: any;
  file: {
    sha: string;
    fileRelativePath: string;
    data: [Object];
  };
  sourceProvider: {
    forkFullName: string;
    headBranch: string;
  };
  preview: boolean;
  error?: string;
}

export default function Post(props: Props) {
  const formOptions = {
    id: "blog",
    label: "blog",
    fields: [
      {
        name: "markdownBody",
        label: "Blog Content",
        component: "markdown",
      },
    ],
  };

  const [formData, form] = useGithubMarkdownForm(props.file, formOptions, {
    branch: props.sourceProvider?.headBranch || "",
    forkFullName: props.sourceProvider?.forkFullName || "",
    baseRepoFullName: process.env.baseRepoFullName || "",
  });
  useGithubErrorListener(form);

  const { frontmatter, markdownBody } = formData;

  const excerpt = formatExcerpt(markdownBody);

  return (
    <InlineForm form={form}>
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
            <div className="bio-blurb">
              {/* <h1>{frontmatter.title}</h1> */}
            </div>
            <LighthouseBG className="lighthouse" />
            <div className="post-content">
              <div className="content-inner">
                <p>{formatDate(frontmatter.date)}</p>
                <h1>{frontmatter.title}</h1>

                <InlineWysiwyg name="markdownBody">
                  <ReactMarkdown source={formData.markdownBody} />
                </InlineWysiwyg>
              </div>
              <footer />
            </div>
          </FadeWrapper>
        </div>
      </motion.div>
    </InlineForm>
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

export async function getStaticProps({
  preview,
  previewData,
  ...context
}: any): Promise<GithubPreviewProps> {
  var fs = require("fs");
  const { slug } = context.params;

  const relPath = path.join(
    "src/content/posts",
    `${decodeURIComponent(slug)}.md`
  );

  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: relPath,
      format: "markdown",
    });
  }
  const file = fs.readFileSync(path.resolve(relPath));
  const { orig, ...data } = matter(file);

  return {
    props: {
      preview: false,
      sourceProvider: null,
      file: {
        sha: "",
        fileRelativePath: relPath,
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        },
      },
      error: null,
    },
  };
}
