// get room id from the url
const { room, newroom } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// variables
const clientState = { gameStarted: false };
const user = {};
let lastUpdate;
let players = [];
let player;

// element selection
const lobbyDiv = document.getElementById("lobby");
const canvasDiv = document.getElementById("myCanvas");
const adminDiv = document.getElementById("admin");
const playerCountDiv = document.getElementById("players-count");

// generate a random username
user.username = `coolusername${Math.floor(Math.random() * 9999)}`;
document.getElementById("username").placeholder = user.username;

// write to the lobby link
const link = window.location.href;
document.getElementById("lobby-link").innerHTML = link;

// connect to socket.io
const socket = io();

// send room id req to server
if (newroom !== undefined) {
  socket.emit("new-room-id", { roomId: newroom, username: user.username });
} else {
  socket.emit("room-id", { roomId: room, username: user.username });
}

// if user joins a room
socket.on("joined-room", function({ id, roomId, admin, newUsers }) {
  console.log(`Joined room: ${roomId}, admin: ${admin}`);

  users = newUsers;
  user.id = id;
  player = new client(id, 50, 50, "#F38181", user.username);

  createAPlayerUsername(id, user.username);
  if (admin) {
    user.admin = true;
    adminDiv.style.display = "block";
    adminPlayerCrown(id, user.username);
  } else {
    user.admin = false;
  }
  clientPlayerSign(id);

  newUsers.forEach(function(cuser) {
    createAPlayerUsername(cuser.id, cuser.username);

    if (cuser.admin) {
      adminPlayerCrown(cuser.id, cuser.username);
    }
    
    players.push(new client(cuser.id, 50, 50, "#F38181", cuser.username));
  });

  playerCountDiv.innerHTML = `Players (${users.length + 1})`;
  lobbyDiv.style.display = "block";
});

// if another user joins the room
socket.on("connect-user", function({ id, username, admin }) {
  console.log(`User ${username} connected`);
  createAPlayerUsername(id, username);
  users.push({ id, username, admin });
  players.push(new client(id, 50, 50, "#F38181", user.username));
  playerCountDiv.innerHTML = `Players (${users.length + 1})`;
});

// if a user disconnects from the room
socket.on("disconnect-user", function(id) {
  console.log(`User ${getUserById(users, id).username} disconnected`);
  removeAPlayerUsername(id);
  users = users.filter(cuser => cuser.id !== id);
  players = players.filter(cplayer => cplayer.id !== id);
  playerCountDiv.innerHTML = `Players (${users.length + 1})`;
});

// if a message from the server is sent
socket.on("msg", function(msg) { console.log(msg) });

// if an error from the server is sent
socket.on("err", function(err) { console.error(err) });

// if server asks to redirect, redirect
socket.on("redirect", function(destination) {
  window.location.href = destination;
});

// if admin changes...
socket.on("admin-change", function(id) {
  if (user.id !== id) {
    const username = getUserById(users, id).username;
    adminPlayerCrown(id, username);
  } else {
    console.log("You are now an admin");
    adminDiv.style.display = "block";
    user.admin = true;
    adminPlayerCrown(id, user.username);
    clientPlayerSign(id);
  }
});

// if a player updates their username
socket.on("change-username", function({ id, newUsername }) {
  getUserById(users, id).username = newUsername;
  updatePlayerUsername(id, newUsername);
  if (getUserById(users, id).admin) {
    adminPlayerCrown(id, newUsername);
  } 
}); 

// when admin starts the game
socket.on("start-game", function() {
  lobbyDiv.style.display = "none";
  clientState.gameStarted = true;
  canvasDiv.style.display = "block";

  document.title = "2DCSGO";
  lastUpdate = performance.now();
  redraw();
});

// when pos changes
socket.on("pos", function({ id, x, y }) {
  if (id !== player.id) {
    getUserById(players, id).pos.x = x;
    getUserById(players, id).pos.y = y;
  } else {
    player.pos.x = x;
    player.pos.y = y;
  }
<<<<<<< HEAD
=======
});

socket.on("start-move", function({ id, x, y, dir }) {
  if (player.id !== id) {
    getUserById(players, id).pos.x = x;
    getUserById(players, id).pos.y = y;
    getUserById(players, id).movement.moveDir = dir;
  } else {
    player.pos.x = x;
    player.pos.y = y;
    player.movement.moveDir = dir;
  }
});

socket.on("stop-move", function({ id, x, y }) {
  if (player.id !== id) {
    getUserById(players, id).pos.x = x;
    getUserById(players, id).pos.y = y;
    getUserById(players, id).movement.moveDir = "";
  } else {
    player.pos.x = x;
    player.pos.y = y;
    player.movement.moveDir = "";
  }
>>>>>>> parent of 0136228 (movement test)
});

// if user is diconnected from the server
socket.on("disconnect", function() {
  console.log("disconnected");
});