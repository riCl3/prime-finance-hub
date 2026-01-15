import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prime-finance-hub';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("Successfully connected to MongoDB");
      return mongoose.connection;
    }).catch((error) => {
      console.error("Error creating mongoose connection promise:", error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise so we can try again
    console.error("Failed to establish MongoDB connection:", e);
    // Depending on strictness, we might want to suppress the throw and return null to avoid crashing
    // but typically a DB connection failure is critical. 
    // However, the user asked to avoid 'Failed to fetch' (often client side) or server crashing.
    // If we return null, the calling code must handle it.
    // Let's rethrow for now but with the logging above, it's easier to debug.
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
