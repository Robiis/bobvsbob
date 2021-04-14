const { ok } = require("assert");
const { SSL_OP_NO_TICKET } = require("constants");
const { json } = require("express");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");

app.use("/", express.static("./client"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`Server started on port ${PORT}`));

let connections = 0;

io.on("connection", function(socket) {
  connections++;

  socket.on("room-id", function(data) {
    socket.roomId = data.room;
    socket.username = data.username;

    socket.join(socket.roomId);
    console.log(socket.roomId);
    socket.emit("joined-room", socket.roomId);
    io.to(socket.roomId).emit("connect-user", socket.username);
  });
});