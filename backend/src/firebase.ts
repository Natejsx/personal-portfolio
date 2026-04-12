import { onRequest } from "firebase-functions/v2/https";
import mongoose from "mongoose";
import app from "./app";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

// Reuse connection across warm invocations
mongoose.connect(MONGODB_URI).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

export const api = onRequest(app);
