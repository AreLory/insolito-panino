import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import { errorMiddleware } from "./middlewares/errorHandler";

import userRouter from "./routes/userRoute";
import ordersRouter from "./routes/ordersRoute";
import productsRouter from "./routes/productsRoute";
import extrasRouter from "./routes/extrasRoute";
import categoriesRouter from "./routes/categoriesRoute";

const cors = require("cors");

const jwtSecret = process.env.JWT;
if (!jwtSecret) {
  throw new Error(
    "JWT is not defined. Add JWT env variable in Render dashboard.",
  );
}

const mongoUri = process.env.MONGO_URI;

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.134:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "https://insolito-panino.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api", ordersRouter);
app.use("/api", extrasRouter);
app.use("/api", productsRouter);
app.use("/api", categoriesRouter);

app.use(errorMiddleware);

async function startServer() {
  try {
    console.log("Connecting to MongoDB...");
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined. Add it in Render dashboard.");
    }
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

startServer();
