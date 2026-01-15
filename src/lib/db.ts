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
  // Return cached connection if available
  if (cached.conn) {
    console.log('♻️  Using cached database connection');
    return cached.conn;
  }

  // Check if MONGODB_URI is set
  if (!MONGODB_URI) {
    const error = new Error('MONGODB_URI is not defined in environment variables');
    console.error('❌', error.message);
    throw error;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    };

    console.log('🔌 Attempting to connect to MongoDB...');

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ Successfully connected to MongoDB");
        console.log("📊 Database:", mongoose.connection.name);
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);

        // Log specific error details
        if (error.name === 'MongooseServerSelectionError') {
          console.error('⚠️  Possible causes:');
          console.error('   - MongoDB URI is incorrect');
          console.error('   - MongoDB server is not reachable');
          console.error('   - IP address not whitelisted in MongoDB Atlas');
        }

        // Reset promise so we can retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Database connection established');
  } catch (e) {
    cached.promise = null; // Reset promise so we can try again
    console.error("❌ Failed to establish MongoDB connection:", e);

    // Provide helpful error message
    const errorMessage = e instanceof Error ? e.message : String(e);
    throw new Error(`Database connection failed: ${errorMessage}`);
  }

  return cached.conn;
}

export default dbConnect;

