import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();

//http server for socket communication
const server = http.createServer(app);

//http server
const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

//apply authentication middlware (socketAuthMiddleware) to all socket connections
io.use(socketAuthMiddleware);

//--function that returns socket.id
// we will use this function middleware to all socket connections
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

//--this is for storing online users
const userSocketMap = {}; //{userId:socketId}

//--listen to socket and connect
io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  //update the online users object in the backend
  //we need to send it to each user in the application
  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //if user disconnected from chats
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
