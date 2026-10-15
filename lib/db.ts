import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    return client.connect();
  }
}

// In Next.js, evaluate clientPromise lazily or on import if URI is present
if (uri) {
  clientPromise = getClientPromise();
} else {
  // Create a placeholder promise that rejects when awaited with a clear message
  clientPromise = Promise.reject(
    new Error(
      "Missing MONGODB_URI environment variable. Please configure it in your .env.local file."
    )
  );
  // Avoid unhandled rejection warning during build phase when DB is not yet used
  clientPromise.catch(() => {});
}

/**
 * Safely retrieves the connected MongoDB database instance.
 * @param dbName Optional database name override
 */
export async function getDatabase(dbName?: string): Promise<Db> {
  const clientInstance = await getClientPromise();
  return clientInstance.db(dbName);
}

export { clientPromise };
export default clientPromise;
