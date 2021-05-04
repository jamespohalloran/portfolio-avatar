import React from "react";
import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { createClient } from "../helpers/createClient";
import { useRouter } from "next/router";

/**
 * This gets loaded dynamically in "pages/_app.js"
 * if you're on a route that starts with "/admin"
 */
const TinaWrapper = ({ children }: { children: any }) => {
  const router = useRouter();
  const branch = router.query.branch as string;

  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: createClient(branch),
      },
      sidebar: true,
      enabled: true,
    });
  }, []);

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>;
};

export default TinaWrapper;
