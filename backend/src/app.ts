import * as dotenv from "dotenv";
dotenv.config();


const jwtSecret = process.env.JWT
if (!jwtSecret) {
  throw new Error("JWT is not defined");
}



import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/userRoute";
import ordersRouter from "./routes/ordersRoute";
import productsRouter from "./routes/productsRoute";
import extrasRouter from "./routes/extrasRoute";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRouter);
app.use(ordersRouter);
app.use(productsRouter);
app.use(extrasRouter);


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
