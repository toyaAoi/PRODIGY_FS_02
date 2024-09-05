import mongoose from "mongoose";
import config from "../config/config.js";

const dbName =
  config.NODE_ENV === "test"
    ? "EMPLOYEE_MANAGEMENT_SYSTEM_TEST"
    : "EMPLOYEE_MANAGEMENT_SYSTEM";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    if (!config.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }
    await mongoose.connect(config.MONGO_URI, {
      dbName,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.stack);
    process.exit(1);
  }
};

export default connectDB;
