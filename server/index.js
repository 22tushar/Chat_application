const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv=require('dotenv')
app.use(cors());
// app.use("dotenv")
const server = http.createServer(app);
dotenv.config()
// aa
const PORT = process.env.PORT || 5000
const io = new Server(server, {
  cors: {
    origin: "*",    
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen( PORT , () => {
  console.log("SERVER IS RUNNING");
});
