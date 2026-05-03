import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

const createAuth = async () => {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    // Return a basic instance for build time if URI is missing
    return betterAuth({
      secret: process.env.BETTER_AUTH_SECRET,
      emailAndPassword: { enabled: true },
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
        },
      },
    });
  }

  const client = await clientPromise;
  const db = client.db();

  return betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(db, {
      client: client,
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    user: {
      additionalFields: {
        image: { type: "string", required: false },
      },
    },
  });
};


export const auth = await createAuth();
