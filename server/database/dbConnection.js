import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../utils/logger.js";

const dbName =
  config.NODE_ENV === "test"
    ? "EMPLOYEE_MANAGEMENT_SYSTEM_TEST"
    : "EMPLOYEE_MANAGEMENT_SYSTEM";

const connectDB = async () => {
  try {
    logger.info("Connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    if (!config.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }
    await mongoose.connect(config.MONGO_URI, {
      dbName,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.stack);
    process.exit(1);
  }
};

export default connectDB;
