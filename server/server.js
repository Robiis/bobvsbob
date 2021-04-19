const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { errorHandler, messageHandler } = require("./messages.js");
const { getRoomById, getUserById } = require("./serverFunctions.js");

// send the whole client folder to the client
app.use(express.static("public"));
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
  socket.on("room-id", function({ roomId, username }) {
    console.log(getRoomById(rooms, roomId));
    if (getRoomById(rooms, roomId)) {
      // add user to users
      users.push({
        id: socket.id,
        roomId,
        username,
        admin: false,
        pos: {},
        movement: {}
      });

      // connect user to the room
      getRoomById(rooms, roomId).users.push(socket.id);
      socket.join(roomId);

      const usersForClient = [];
      users.forEach(function(user) { 
        if (user.roomId === roomId && user.id !== socket.id) {
          usersForClient.push({ id: user.id, username: user.username, admin: user.admin, pos: user.pos, movement: user.movement }) ;
        }
      });

      socket.emit("joined-room", { id: socket.id, roomId, admin: false, newUsers: usersForClient });
      socket.broadcast.to(roomId).emit("connect-user", { id: socket.id, username, admin: false });

      console.log(rooms);
      console.log(users);
    } else {
      errorHandler(socket, "No room with that id found");
    }
  });

  // when user creates a new room
  socket.on("new-room-id", function({ roomId, username }) {
    if (!getRoomById(rooms, roomId)) {
      // add user to users
      users.push({
        id: socket.id,
        roomId,
        username,
        admin: true,
        pos: {}, 
        movement: {}
      });

      const usersForClient = [];
      users.forEach(function(user) { 
        if (user.roomId === roomId && user.id !== socket.id) {
          usersForClient.push({ id: user.id, username: user.username, admin: user.admin, pos: user.pos, movement: user.movement }) ;
        }
      });
      
      // create a new room and join the user to it
      rooms.push({ roomId, gameStarted: false, users: [socket.id] });
      socket.join(roomId);
      socket.emit("joined-room", { id: socket.id, roomId, admin: true, newUsers: usersForClient });
      socket.broadcast.to(roomId).emit("connect-user", { id: socket.id, username, admin: true });

      console.log(rooms);
      console.log(users);
    } else {
      // ask user to redirect
      socket.emit("redirect", `/main.html?room=${roomId}`);
    }
  });

  // when a socket changes their username
  socket.on("change-username", function(username) {
    const user = getUserById(users, socket.id);
    socket.broadcast.to(user.roomId).emit("change-username", { id: socket.id, newUsername: username });
    user.username = username;
  }); 

  socket.on("start-game", function() {
    const user = getUserById(users, socket.id);
    const room = getRoomById(rooms, user.roomId);
    if (user.admin && room.gameStarted === false) {
      room.gameStarted = true;

      setInterval(function() {
        users.forEach(function(user) {
          if (user.movement.moving === true) {
            switch (user.movement.dir) {
              case "":
                break;
              default:
                break;
            }
          }
          io.to(user.roomId).emit("pos", { x: user.pos.x, y: user.pos.y });
        });
      }, 1000/60);

      io.to(room.roomId).emit("start-game");
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

          io.to(room.roomId).emit("admin-change", newAdminId);
          getUserById(users, newAdminId).admin = true;
        }
      }

      // delete user from users
      users = users.filter(cuser => cuser.id !== user.id);
      io.to(user.roomId).emit("disconnect-user", user.id);
    }
    console.log(rooms);
    console.log(users);
  });
});