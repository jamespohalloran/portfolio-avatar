import React from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import matter from "gray-matter";
import { Post } from "../../components/post";
import { TinaCMS, TinaProvider } from "tinacms";
import { useForm, usePlugin } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
var path = require("path");

const EditablePost = (props: any) => {
  const markdownBody = props.content;
  const frontmatter = props.data;

  const [modifiedValues, form] = useForm({
    id: props.fileRelativePath,
    label: "Edit Post",
    fields: [
      {
        name: "title",
        label: "Title",
        component: "text",
      },
      {
        name: "markdownContent",
        label: "content",
        component: "markdown",
      },
    ],
    initialValues: {
      title: frontmatter.title,
      markdownContent: markdownBody,
    },
    onSubmit: async (formData) => {
      // save the new form data
    },
  });

  // 2. Register it with the CMS
  usePlugin(form);

  return <Post {...props} />;
};

export default (props: any) => {
  const cms = new TinaCMS({
    sidebar: true,
    enabled: true,
  });
  cms.plugins.add(MarkdownFieldPlugin);

  return (
    <TinaProvider cms={cms}>
      <EditablePost {...props} />
    </TinaProvider>
  );
};

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
