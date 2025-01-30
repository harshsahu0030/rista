import path from "path";
import express from "express";
import dotenv from "dotenv";
import middleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { socketAuthenticator } from "./middlewares/auth.js";
import { v4 as uuid } from "uuid";
import connectDb from "./config/db.js";

export const userSocketIDs = new Map();
const onlineUsers = new Set();

// connecting to frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//dotenv
dotenv.config({ path: "./config/.env" });

// mongoDB
connectDb();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//express
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//middlewares
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.static("public"));

//import routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import { NEW_MESSAGE } from "./constant/events.js";

//routes
app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", chatRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      throw new Error(error);
    }
  });

  // socket.on(START_TYPING, ({ members, chatId }) => {
  //   const membersSockets = getSockets(members);
  //   socket.to(membersSockets).emit(START_TYPING, { chatId });
  // });

  // socket.on(STOP_TYPING, ({ members, chatId }) => {
  //   const membersSockets = getSockets(members);
  //   socket.to(membersSockets).emit(STOP_TYPING, { chatId });
  // });

  // socket.on(CHAT_JOINED, ({ userId, members }) => {
  //   onlineUsers.add(userId.toString());

  //   const membersSocket = getSockets(members);
  //   io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  // });

  // socket.on(CHAT_LEAVED, ({ userId, members }) => {
  //   onlineUsers.delete(userId.toString());

  //   const membersSocket = getSockets(members);
  //   io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  // });

  // socket.on("disconnect", () => {
  //   userSocketIDs.delete(user._id.toString());
  //   onlineUsers.delete(user._id.toString());
  //   socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
  // });
});

// middleware
app.use(middleware);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
