const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { errorHandler } = require("./messages.js");
const { getRoomById, getUserById } = require("./serverFunctions.js");

// send the whole client folder to the client
app.use(express.static("src"));
app.use("/", express.static("./client"));

// start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`Server started on port ${PORT}`));

// rooms & users
let rooms = [];
let users = [];
const laiks = 60000;

// all possible player respawn points
const respawnPoints = [
  // forest biome
  [-1900, -1350], [-1750, -430], [-1110, -1220],
  // snowy biome
  [1850, -1050], [1380, -150], [1040, -850],
  // desert biome
  [-180, 1260], [-270, 760], [360, 500]
];

// when user connects
io.on("connection", function(socket) {
  // when user joins a room
  socket.on("room-id", function({ roomId, username }) {
    try {
      if (getRoomById(rooms, roomId) && getRoomById(rooms, roomId).gameStarted !== true) {
        if (username !== "" && username.length < 16 && username.length > 0) {
          const [posX, posY] = newPos(roomId);

          // add user to users
          users.push({
            id: socket.id,
            roomId,
            username,
            admin: false,
            pos: {x: posX, y: posY}, 
            spawnPos: {x: posX, y: posY},
            movement: {dir: ""},
            health: 100,
            kills: 0,
            damage: 0
          });

          // connect user to the room
          getRoomById(rooms, roomId).users.push(socket.id);
          socket.join(roomId);

          const usersForClient = [];
          users.forEach(function(user) { 
            if (user.roomId === roomId && user.id !== socket.id) {
              usersForClient.push({ id: user.id, username: user.username, admin: user.admin, movement: user.movement }) ;
            }
          });

          const user = getUserById(users, socket.id);
          socket.emit("joined-room", { id: socket.id, roomId, admin: false, newUsers: usersForClient });
          socket.broadcast.to(roomId).emit("connect-user", { id: socket.id, username, admin: false });

          // console.log(rooms);
          // console.log(users);
        } else {
          errorHandler(socket, "err3");
        }
      } else {
        if (getRoomById(rooms, roomId) !== undefined) {
          if (getRoomById(rooms, roomId).gameStarted === true) {
            errorHandler(socket, "err1");
          } else {
            errorHandler(socket, "err2");
          }
        } else {
          errorHandler(socket, "err2");
        }
      }
    } catch(err) {
      console.log(err);
    }
  });

  // when user creates a new room
  socket.on("new-room-id", function({ roomId, username }) {
    try {
      if (!getRoomById(rooms, roomId)) {
        if (username !== "" && username.length < 16 && username.length > 0) {
          // create a new room and join the user to it
          rooms.push({ roomId, gameStarted: false, users: [socket.id], startRespawnPoints: respawnPoints.map((respP) => respP)});
          socket.join(roomId);

          const [posX, posY] = newPos(roomId);

          // add user to users
          users.push({
            id: socket.id,
            roomId,
            username,
            admin: true,
            pos: {x: posX, y: posY}, 
            spawnPos: {x: posX, y: posY},
            movement: {dir: ""},
            health: 100,
            kills: 0,
            damage: 0
          });

          const usersForClient = [];
          users.forEach(function(user) { 
            if (user.roomId === roomId && user.id !== socket.id) {
              usersForClient.push({ id: user.id, username: user.username, admin: user.admin, movement: user.movement }) ;
            }
          });

          const user = getUserById(users, socket.id);
          socket.emit("joined-room", { id: socket.id, roomId, admin: true, newUsers: usersForClient });
          socket.broadcast.to(roomId).emit("connect-user", { id: socket.id, username, admin: true });

          // console.log(rooms);
          // console.log(users);
        } else {
          errorHandler(socket, "err3");
        }
      } else {
        // ask user to redirect
        socket.emit("redirect", `/main.html?room=${roomId}`);
      }
    } catch(err) {
      console.log(err);
    }
  });

  // when a socket changes their username
  socket.on("change-username", function(username) {
    try {
      if (username !== "" && username.length < 16 && username.length > 0) {
        const user = getUserById(users, socket.id);
        socket.broadcast.to(user.roomId).emit("change-username", { id: socket.id, newUsername: username });
        user.username = username;
      } else {
        errorHandler(socket, "err3");
      }
    } catch(err) {
      console.log(err);
    }
  }); 

  // when client starts game
  socket.on("start-game", function() {
    try {
      const user = getUserById(users, socket.id);
      const room = getRoomById(rooms, user.roomId);
      if (user.admin && room.gameStarted === false) {
        room.gameStarted = true;

        // players x and y
        const playersxy = [];
        users.forEach(function(cuser) {
          if (cuser.roomId === room.roomId) {
            playersxy.push({
              x: cuser.pos.x,
              y: cuser.pos.y,
              id: cuser.id
            });
          }
        });
          
        // start the game
        io.to(room.roomId).emit("start-game", playersxy);

        // stop the game
        room.gameEndTimeout = setTimeout(function() {
          if (getRoomById(rooms, room.roomId)) {
            getRoomById(rooms, room.roomId).startRespawnPoints = respawnPoints.map((respP) => respP);
            users.forEach(function(cuser) {
              if (cuser.roomId === room.roomId) {
                const [posX, posY] = newPos(room.roomId);

                cuser.pos.x = posX;
                cuser.pos.y = posY;
                cuser.spawnPos.x = posX;
                cuser.spawnPos.y = posY;
              }
            });

            room.gameStarted = false;
            io.to(room.roomId).emit("stop-game");
          }
        }, laiks);
      }
    } catch(err) {
      console.log(err);
    }
  });

  // when user starts to move
  socket.on("start-move", function({ dir, x, y }) {
    try {
      const user = getUserById(users, socket.id);
      user.movement.dir = dir;
      user.pos.x = x;
      user.pos.y = y;
      socket.broadcast.to(user.roomId).emit("start-move", { id: socket.id, dir, x, y });
    } catch(err) {
      console.log(err);
    }
  });

  // when user stops moving
  socket.on("stop-move", function({ x, y }) {
    try {
      const user = getUserById(users, socket.id);
      user.movement.dir = "";
      user.pos.x = x;
      user.pos.y = y;
      socket.broadcast.to(user.roomId).emit("stop-move", { id: socket.id, x, y });
    } catch(err) {
      console.log(err);
    }
  });

  // when client shoots and hits
  socket.on("shoot-hit", function({ fromX, fromY, toX, toY, hitId, damage, drawable }) {
    try {
      const hitUser = getUserById(users, hitId);
      const shootUser = getUserById(users, socket.id);

      socket.broadcast.to(shootUser.roomId).emit("shoot-hit", { fromX, fromY, toX, toY, sendId: socket.id, hitId, damage, drawable });

      hitUser.health -= damage;
      shootUser.damage += damage;
      if (hitUser.health <= 0) {
        // respawn the player
        let tempRespawnPoints = respawnPoints.map((respPoint) => respPoint);
        tempRespawnPoints.forEach(function(respPoint) {
          if (respPoint[0] === hitUser.spawnPos.x && respPoint[1] === hitUser.spawnPos.y) {
            tempRespawnPoints = tempRespawnPoints.filter(respP => respP !== respPoint);
          }
        });

        const [posX, posY] = tempRespawnPoints[Math.floor(Math.random() * tempRespawnPoints.length)];

        hitUser.pos.x = posX;
        hitUser.pos.y = posY;
        hitUser.spawnPos.x = posX;
        hitUser.spawnPos.y = posY;

        shootUser.kills++;
        hitUser.health = 100;
        io.to(hitUser.roomId).emit("respawn", { sendId: socket.id, hitId, x: hitUser.pos.x, y: hitUser.pos.y });
      }
    } catch(err) {
      console.log(err);
    }
  });

  // when client shoots
  socket.on("shoot", function({ fromX, fromY, toX, toY }) {
    try {
      socket.broadcast.to(getUserById(users, socket.id).roomId).emit("shoot", { fromX, fromY, toX, toY, id: socket.id });
    } catch(err) {
      console.log(err);
    }
  });

  // when client uses rpg
  socket.on("rpg-shoot", function({ x, y }) {
    try {
      socket.broadcast.to(getUserById(users, socket.id).roomId).emit("rpg-shoot", { x, y, id: socket.id });
    } catch(err) {
      console.log(err);
    }
  });

  // when user disconnects
  socket.on("disconnect", function() {
    try {
      if (getUserById(users, socket.id)) {
        const user = getUserById(users, socket.id);
        const room = getRoomById(rooms, user.roomId);

        // remove user from room
        room.users = room.users.filter(user => user !== socket.id);

        if (room.users.length <= 0) {
          // remove room if empty
          clearTimeout(room.gameEndTimeout);
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
      // console.log(rooms);
      // console.log(users);
    } catch(err) {
      console.log(err);
    }
  }); 
});

// make a new player position
function newPos(roomId) {
  const room = getRoomById(rooms, roomId);
  const respPoints = room.startRespawnPoints[Math.floor(Math.random() * room.startRespawnPoints.length)];
  room.startRespawnPoints = room.startRespawnPoints.filter(respP => respP !== respPoints);

  if (room.startRespawnPoints.length <= 0) {
    room.startRespawnPoints = respawnPoints.map((respP) => respP);
  }

  return respPoints;
}