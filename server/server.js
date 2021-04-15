const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { errorHandler, messageHandler } = require("./messages.js");

// send the whole client folder to the client
app.use("/", express.static("./client"));

// start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`Server started on port ${PORT}`));

// variables
let rooms = [];

// when user connects
io.on("connection", function(socket) {
  // when user joins a room
  socket.on("room-id", function(roomId) {
    if (rooms.find(room => room.roomId === roomId)) {
      // set socket variables
      socket.roomId = roomId;
      socket.admin = false;

      // connect user to the room
      rooms.find(room => room.roomId === socket.roomId).sockets.push(socket.id);
      socket.join(socket.roomId);
      socket.emit("joined-room", { roomId: socket.roomId, admin: socket.admin });
      io.to(socket.roomId).emit("connect-user", socket.id);

      console.log(rooms);
    } else {
      errorHandler(socket, "No room with that id found");
    }
  });

  // when user creates a new room
  socket.on("new-room-id", function(roomId) {
    if (!rooms.find(room => room.roomId === roomId)) {
      // set socket variables
      socket.roomId = roomId;
      socket.admin = true;
      
      // create a new room and join the user to it
      rooms.push({ roomId: socket.roomId, sockets: [socket.id] });
      socket.join(socket.roomId);
      socket.emit("joined-room", { roomId: socket.roomId, admin: socket.admin });
      io.to(socket.roomId).emit("connect-user", socket.id);

      console.log(rooms);
    } else {
      // ask user to redirect
      socket.emit("redirect", `/main.html?room=${roomId}`);
    }
  });

  // when user disconnects
  socket.on("disconnect", function() {
    rooms.forEach(function(room) {
      // remove player from room
      if (room.roomId === socket.roomId) {
        room.sockets = room.sockets.filter(user => user !== socket.id);
      }

      // remove room if no players in room
      if (room.sockets.length <= 0) {
        rooms = rooms.filter(croom => croom.roomId !== room.roomId);
      }
    });

    console.log(rooms);
    io.to(socket.roomId).emit("msg", `User ${socket.id} disconnected`);
  });
});