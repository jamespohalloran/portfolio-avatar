import React from "react";
import { TinaCMS } from "tinacms";
import { Client, TinaCloudAuthWall } from "tina-graphql-gateway";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = ({ children }: { children: any }) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: new Client({
          organizationId: "awkosock",
          clientId: "7nnikc9d9d00802atg8s1ecrut",
          branch: "tina-cloud3",
        }),
      },
      sidebar: true,
      enabled: true,
    });
  }, []);

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>;
};

export default TinaWrapper;
