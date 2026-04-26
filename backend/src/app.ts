import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/auth";
import postsRouter from "./routes/posts";
import subscribersRouter from "./routes/subscribers";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const subscriberLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", loginLimiter, authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/subscribers", subscriberLimiter, subscribersRouter);
app.get("/api/hello", (_req, res) => res.json({ message: "Hello from the backend!" }));

export default app;
