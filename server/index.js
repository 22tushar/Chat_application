const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT=process.env.PORT || 3001
app.use(cors());

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "node index.js"));
});

const io = new Server(server, {
  cors: {
    origin: "https://chattingapp01.vercel.app/",
    methods: ["GET", "POST"],
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

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING");
});

