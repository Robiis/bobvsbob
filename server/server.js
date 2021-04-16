const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { errorHandler, messageHandler } = require("./messages.js");
const { getRoomById, getUserById } = require("./serverFunctions.js");

// send the whole client folder to the client
app.use("/", express.static("./client"));

// start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`Server started on port ${PORT}`));

// rooms & users
let rooms = [];
let users = [];

// when user connects
io.on("connection", function(socket) {
  // when user joins a room
  socket.on("room-id", function(roomId) {
    if (getRoomById(rooms, roomId)) {
      // add user to users
      users.push({
        id: socket.id,
        roomId: roomId,
        admin: false
      });

      // connect user to the room
      getRoomById(rooms, roomId).users.push(socket.id);
      socket.join(roomId);
      socket.emit("joined-room", { roomId, admin: false });
      io.to(roomId).emit("connect-user", socket.id);

      console.log(rooms);
      console.log(users);
    } else {
      errorHandler(socket, "No room with that id found");
    }
  });

  // when user creates a new room
  socket.on("new-room-id", function(roomId) {
    if (!getRoomById(rooms, roomId)) {
      // add user to users
      users.push({
        id: socket.id,
        roomId: roomId,
        admin: true
      });
      
      // create a new room and join the user to it
      rooms.push({ roomId, users: [socket.id] });
      socket.join(roomId);
      socket.emit("joined-room", { roomId, admin: true });
      io.to(roomId).emit("connect-user", socket.id);

      console.log(rooms);
      console.log(users);
    } else {
      // ask user to redirect
      socket.emit("redirect", `/main.html?room=${roomId}`);
    }
  });

  // when user disconnects
  socket.on("disconnect", function() {
    if (getUserById(users, socket.id)) {
      const user = getUserById(users, socket.id);
      const room = getRoomById(rooms, user.roomId);

      // remove user from room
      room.users = room.users.filter(user => user !== socket.id);

      if (room.users.length <= 0) {
        // remove room if empty
        rooms = rooms.filter(croom => croom.roomId !== user.roomId);
      } else {
        // set another player to admin, if player was admin
        if (user.admin) {
          const newAdminId = room.users[Math.floor(Math.random() * room.users.length)];
          io.to(newAdminId).emit("new-admin");
          getUserById(users, newAdminId).admin = true;
          console.log("new admin");
        }
      }

      // delete user from users
      users = users.filter(cuser => cuser.id !== user.id);
      io.to(user.roomId).emit("msg", `User ${socket.id} disconnected`);
    }
    console.log(rooms);
    console.log(users);
  });
});