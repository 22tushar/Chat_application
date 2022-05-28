const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const PORT=process.env.PORT || 3001
app.use(cors());

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "client", "build")))

var io=require('socket.io')(server);
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

