// @/lib/mongodb.ts (Using Mongoose)

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// 🟢 CRITICAL FIX: Change the return type and value
export async function connectDB() {
  if (cached.conn) {
    // If connection is cached, return the native Db instance
    
    return { db: cached.conn.connection.db }; 
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => mongooseInstance);
  }

  // Await the Mongoose connection
  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance;

  // 🟢 CRITICAL: Extract the native Db instance from the Mongoose connection 
  // and return it inside the expected object structure { db: ... }
  return { db: mongooseInstance.connection.db };
}