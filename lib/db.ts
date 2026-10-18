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
    const errorMsg =
      "Missing MONGODB_URI environment variable. Please configure MONGODB_URI in your environment settings (.env / production variables).";
    console.error(`[MONGODB_CONFIG_ERROR] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      console.log("[MONGODB_INIT] Initializing new MongoDB client in development mode...");
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch((err) => {
        console.error("[MONGODB_CONNECT_DEV_ERROR] Failed to connect to MongoDB in development:", err);
        throw err;
      });
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, reuse single client promise to prevent connection exhaustion
    if (!clientPromise) {
      console.log("[MONGODB_INIT] Initializing new MongoDB client in production mode...");
      client = new MongoClient(uri, options);
      clientPromise = client.connect().catch((err) => {
        console.error("[MONGODB_CONNECT_PROD_ERROR] Failed to connect to MongoDB in production:", err);
        throw err;
      });
    }
    return clientPromise;
  }
}

// In Next.js, evaluate clientPromise lazily or on import if URI is present
if (uri) {
  clientPromise = getClientPromise();
} else {
  // Create a placeholder promise that rejects when awaited with a clear message
  clientPromise = Promise.reject(
    new Error(
      "Missing MONGODB_URI environment variable. Please configure it in your environment settings."
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

