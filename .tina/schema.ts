import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "posts",
      path: "src/content/posts",
      templates: [
        {
          label: "Post",
          name: "post",
          fields: [
            {
              type: "datetime",
              label: "Date",
              name: "date",
            },
            {
              type: "text",
              label: "Title",
              name: "title",
            },
          ],
        },
      ],
    },
  ],
});
