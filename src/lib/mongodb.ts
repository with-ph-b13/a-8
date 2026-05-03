import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  if (process.env.NODE_ENV === "production") {
    // In production (like Vercel build), we don't want to throw at top level 
    // unless the DB is actually accessed.
    clientPromise = Promise.reject(new Error('Invalid/Missing environment variable: "MONGODB_URI"'));
  } else {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
} else {
  if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
