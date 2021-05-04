import React from "react";
import { useGraphqlForms } from "tina-graphql-gateway";
import BlogPostPage, { query, PostQueryResponseType } from "../../blog/[slug]";

interface Props {
  slug: string;
}

export default function AdminPage(props: Props) {
  const [payload, isLoading] = useGraphqlForms<PostQueryResponseType>({
    query,
    variables: { relativePath: `${props.slug}.md` },
  });
  return isLoading ? <p>Loading...</p> : <BlogPostPage {...payload} />;
}

export const getServerSideProps = ({ params }: { params: Props }) => {
  return { props: params };
};
