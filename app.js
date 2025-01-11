import express from "express";
import dotenv from "dotenv";
import middleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

//express
const app = express();

//dotenv
dotenv.config({ path: "./config/.env" });

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middlewares
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

//import routes
import usserRoute from "./routes/userRoute.js";

//routes
app.use("/api/v1", usserRoute);

//connecting to frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

//middleware
app.use(middleware);

export default app;
