import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, { cors: { origin: [allowedOrigin] } });

function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//online users map ={ userId: socketId}
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; //let socket know who you are
  if (!userId) userSocketMap[userId] = socket.id;

  //sends events to everyone - broadcast
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //listens for events
  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});


export { app, server, io, getReceiverSocketId};