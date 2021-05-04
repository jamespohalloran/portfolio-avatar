import { Client, LocalClient } from "tina-graphql-gateway";

export const createClient = (branch?: string) => {
  return process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT === "1"
    ? new LocalClient()
    : createCloudClient(branch);
};

export const createCloudClient = (branch: string = "tina-cloud") => {
  const organization = process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;

  const missingEnv: string[] = [];
  if (!organization) {
    missingEnv.push("NEXT_PUBLIC_ORGANIZATION_NAME");
  }
  if (!clientId) {
    missingEnv.push("NEXT_PUBLIC_TINA_CLIENT_ID");
  }

  if (missingEnv.length) {
    throw new Error(`The following environment variables are required when using the Tina Cloud Client:
     ${missingEnv.join(", ")}`);
  }

  return new Client({
    organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_NAME!,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    branch: branch,
  });
};
