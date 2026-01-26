import * as dotenv from "dotenv";
dotenv.config();


const jwtSecret = process.env.JWT
if (!jwtSecret) {
  throw new Error("JWT is not defined");
}

import express from "express";
import mongoose from "mongoose";
const cors = require("cors");

import userRouter from "./routes/userRoute";
import ordersRouter from "./routes/ordersRoute";
import productsRouter from "./routes/productsRoute";
import extrasRouter from "./routes/extrasRoute";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", userRouter);
app.use("/api", ordersRouter);
app.use("/api", productsRouter);
app.use("/api", extrasRouter);


// Server + DB
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

startServer();
