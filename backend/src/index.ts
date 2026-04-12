import mongoose from "mongoose";
import app from "./app";

const PORT = Number(process.env.PORT || 8080);
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
