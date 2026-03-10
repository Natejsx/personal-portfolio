import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import postsRouter from "./routes/posts";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8080);

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.get("/api/hello", (_req, res) => res.json({ message: "Hello from the backend!" }));

// Static assets from Vite build
const distPath = path.join(__dirname, "..", "..", "frontend", "dist");
app.use(express.static(distPath));

// SPA fallback for everything NOT starting with /api
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const MONGODB_URI = process.env.MONGODB_URI ?? "";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
