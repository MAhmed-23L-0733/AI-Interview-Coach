import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

const rawUri = process.env.MONGODB_URI?.trim();
const uri = rawUri ? rawUri.replace(/^["']/, "").replace(/["']$/, "").trim() : undefined;

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 0,
  maxIdleTimeMS: 60000,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Returns or initializes the shared MongoClient promise.
 * Uses globalThis caching across both development and serverless production
 * so warm function containers reuse existing connections.
 * Automatically clears the cached promise on rejection to allow self-healing retries.
 */
function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    const errorMsg =
      "Missing MONGODB_URI environment variable. Please configure MONGODB_URI in your environment settings (.env / production variables).";
    console.error(`[MONGODB_CONFIG_ERROR] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  if (!global._mongoClientPromise) {
    console.log("[MONGODB_INIT] Initializing shared MongoDB client connection...");
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((err) => {
      // Reset cache on error so subsequent requests can attempt a fresh connection
      global._mongoClientPromise = undefined;
      console.error("[MONGODB_CONNECT_ERROR] Failed to connect to MongoDB:", err);
      throw err;
    });
  }

  return global._mongoClientPromise;
}

// In Next.js, initialize clientPromise lazily or on import if URI is present
let clientPromise: Promise<MongoClient>;
if (uri) {
  clientPromise = getClientPromise();
} else {
  clientPromise = Promise.reject(
    new Error(
      "Missing MONGODB_URI environment variable. Please configure it in your environment settings."
    )
  );
  clientPromise.catch(() => {});
}

/**
 * Safely retrieves the connected MongoDB database instance.
 * Defaults to "ai_interview_coach" if not specified.
 * @param dbName Optional database name override
 */
export async function getDatabase(dbName?: string): Promise<Db> {
  const clientInstance = await getClientPromise();
  return clientInstance.db(dbName || "ai_interview_coach");
}

export { clientPromise };
export default clientPromise;

