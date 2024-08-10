import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8084;
const HOST = "0.0.0.0";
const MONGOURI = process.env.MONGO_URI;

if (!MONGOURI) {
  throw new Error("MONGOURI environment variable is not defined");
}

const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      dbName: "qasetech",
    });
    console.log("MongoDB connection was successful...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    setTimeout(connectWithRetry, 5000);
  }
};

const startServer = async () => {
  await connectWithRetry();
  app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
};

startServer();
