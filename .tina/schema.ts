import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Marketing Pages",
      name: "marketingPages",
      path: "src/content",
      templates: [
        {
          label: "About",
          name: "about",
          fields: [
            {
              type: "text",
              label: "Title",
              name: "title",
            },
            {
              type: "text",
              label: "Contact Button",
              name: "contactButton",
            },
          ],
        },
      ],
    },
  ],
});
