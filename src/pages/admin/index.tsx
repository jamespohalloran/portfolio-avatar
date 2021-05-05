import React from "react";
import { useGraphqlForms } from "tina-graphql-gateway";

export default function () {
  const query = (gql: any) => gql`
    query BlogPostQuery($relativePath: String!) {
      getMarketingPagesDocument(relativePath: $relativePath) {
        data {
          __typename
          ... on About_Doc_Data {
            title
            contactButton
            _body
          }
        }
      }
    }
  `;
  const [payload, isLoading] = useGraphqlForms({
    query,
    variables: { relativePath: `about.md` },
  });
  return <div>My admin page</div>;
}
