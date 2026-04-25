import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import postsRouter from "./routes/posts";
import subscribersRouter from "./routes/subscribers";

dotenv.config();

const app = express();

const corsOptions = { origin: true, credentials: true };
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/subscribers", subscribersRouter);
app.get("/api/hello", (_req, res) => res.json({ message: "Hello from the backend!" }));

export default app;
