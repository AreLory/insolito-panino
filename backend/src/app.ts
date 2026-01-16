import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRouter from "./routes/userRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRouter);


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



const users = [{name: 'name'}]
// Get Users
app.get(  '/users' , (req, res) => {
    res.json(users)
})