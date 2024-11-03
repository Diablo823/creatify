import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Declare global types for TypeScript

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null
  } | undefined;
}

// Initialize the cached connection

let cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null
};

// Set up global mongoose cache

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  }
  cached = global.mongoose;
}

// let cached: MongooseConnection = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = {
//     conn: null,
//     promise: null,
//   };
// }

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("MISSING MONGODB_URL!");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "creatify",
      bufferCommands: false,
    });

    cached.conn = await cached.promise;

    return cached.conn;
};
