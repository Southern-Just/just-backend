import mongoose from "mongoose";

import { DB_URL, NODE_ENV } from "../config/.env.js";

if (!DB_URL) {
  throw new Error(
    "please define MONGODB_URL environment variable inside .env.<development/production>.local",
  );
}
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
};
export default connectToDatabase;
