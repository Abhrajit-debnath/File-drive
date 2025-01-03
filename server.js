import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import connectToDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import logoutRouter from "./routes/logout.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import imagesRouter from "./routes/images.routes.js";
import path from "path"; 
import { fileURLToPath } from "url";

dotenv.config();
connectToDb();

const app = express();

const fileName= fileURLToPath(import.meta.url);
const __dirname= path.dirname(fileName);

// Set up CORS with dynamic origin
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/users", logoutRouter);
app.use("/api", uploadRouter);
app.use("/api", imagesRouter);

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile((path.join(__dirname, "/client/dist/index.html")));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
