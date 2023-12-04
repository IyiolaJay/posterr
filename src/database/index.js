import mongoose from "mongoose";
import config from "../config/default.js";

const uri = config.databaseUri;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri ?? "");

    console.log("MongoDB connection successful!");
  } catch (error) {
    console.log("Failed to connect to Database: ", error);
    process.exit(1);
  }
};