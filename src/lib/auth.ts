import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

const createAuth = async () => {
  const uri = process.env.MONGODB_URI;
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";
  
  // Base configuration shared between build and runtime
  const baseConfig = {
    secret: process.env.BETTER_AUTH_SECRET || "build-time-dummy-secret-at-least-32-chars-long",
    baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
  };

  if (!uri || isBuild) {
    // Return a basic instance for build time or if URI is missing
    return betterAuth(baseConfig);
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    return betterAuth({
      ...baseConfig,
      database: mongodbAdapter(db, {
        client: client,
      }),
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB for Auth:", error);
    return betterAuth(baseConfig);
  }
};

export const auth = await createAuth();
