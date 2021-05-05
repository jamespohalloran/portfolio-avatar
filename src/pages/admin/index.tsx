import React from "react";
import { useGraphqlForms } from "tina-graphql-gateway";
import { MarketingPages_Document } from "../../../.tina/__generated__/types";
import AboutPage from "../about";

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
  const [payload, isLoading] = useGraphqlForms<{
    getMarketingPagesDocument: MarketingPages_Document;
  }>({
    query,
    variables: { relativePath: `about.md` },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const payloadData = payload.getMarketingPagesDocument.data!;
  const pageData = { data: payloadData, content: payloadData._body };

  return <AboutPage {...pageData} />;
}
