// get room id from the url
const { room, newroom } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// variables
const laiks = 60;
const clientState = { gameStarted: false, gameStartTime: 0, gameLength: laiks };
const user = { kills: 0, damage: 0 };
let lastUpdate;
let players = [];
let player;

// element selection
const lobbyDiv = document.getElementById("lobby");
const canvasDiv = document.getElementById("myCanvas");
const adminDiv = document.getElementById("admin");
const playerCountDiv = document.getElementById("players-count");
const errDiv = document.getElementById("err");
const errMsg = document.getElementById("err-msg");
const loader = document.querySelector(".loader");
const resultsDiv = document.getElementById("results");
const joymain = document.getElementById("joymain");

// generate a random username
user.username = `bob${Math.floor(Math.random() * 9999)}`;
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
socket.on("joined-room", function ({ id, roomId, admin, newUsers }) {
  loader.style.display = "none";
  // setTimeout(function() {loader.style.display = "none"}, 5000);
  console.log(`Joined room: ${roomId}, admin: ${admin}`);

  users = newUsers;
  users.forEach(function (cuser) {
    cuser.kills = 0;
    cuser.damage = 0;
  });
  user.id = id;
  player = new client(id, 0, 0, "#FC766AFF", user.username);

  createAPlayerUsername(id, user.username);
  if (admin) {
    user.admin = true;
    adminDiv.style.display = "block";
    adminPlayerCrown(id, user.username);
  } else {
    user.admin = false;
  }
  clientPlayerSign(id);

  newUsers.forEach(function (cuser) {
    createAPlayerUsername(cuser.id, cuser.username);

    if (cuser.admin) {
      adminPlayerCrown(cuser.id, cuser.username);
    }

    players.push(new client(cuser.id, 0, 0, "#FC766AFF", cuser.username));
  });

  playerCountDiv.innerHTML = `Players (${users.length + 1})`;
  lobbyDiv.style.display = "block";
});

// if another user joins the room
socket.on("connect-user", function ({ id, username, admin }) {
  console.log(`User ${username} connected`);
  createAPlayerUsername(id, username);
  users.push({ id, username, admin, kills: 0, damage: 0 });
  players.push(new client(id, 0, 0, "#FC766AFF", username));
  playerCountDiv.innerHTML = `Players (${users.length + 1})`;
});

// if a user disconnects from the room
socket.on("disconnect-user", function (id) {
  console.log(`User ${getUserById(users, id).username} disconnected`);
  removeAPlayerUsername(id);
  users = users.filter((cuser) => cuser.id !== id);
  players = players.filter((cplayer) => cplayer.id !== id);
  playerCountDiv.innerHTML = `Players (${users.length + 1})`;
});

// if an error from the server is sent
socket.on("err", function (err) {
  if (err === "err1") {
    console.log("Error - Game already started");
    errDiv.style.display = "block";
    errMsg.innerHTML =
      "Error - Game already started <br> <a href='/'>Back to menu</a>";
    loader.style.display = "none";
    canvasDiv.style.display = "none";
    resultsDiv.style.display = "none";
  } else if (err === "err2") {
    console.log("Error - No room with that id found");
    errDiv.style.display = "block";
    errMsg.innerHTML =
      "Error - No room with that id found <br> <a href='/'>Back to menu</a>";
    loader.style.display = "none";
    canvasDiv.style.display = "none";
    resultsDiv.style.display = "none";
  } else if (err === "err3") {
    console.log("Error - Invalid username");
    errDiv.style.display = "block";
    errMsg.innerHTML =
      "Error - Invalid username <br> <a href='/'>Back to menu</a>";
    loader.style.display = "none";
    lobbyDiv.style.display = "none";
    canvasDiv.style.display = "none";
    resultsDiv.style.display = "none";
  }
  joymain.style.display = "none";
  clientState.gameStarted = false;
});

// if server asks to redirect, redirect
socket.on("redirect", function (destination) {
  window.location.href = destination;
});

// if admin changes...
socket.on("admin-change", function (id) {
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
socket.on("change-username", function ({ id, newUsername }) {
  getUserById(users, id).username = newUsername;
  getUserById(players, id).username = newUsername;
  updatePlayerUsername(id, newUsername);
  if (getUserById(users, id).admin) {
    adminPlayerCrown(id, newUsername);
  }
});

// when admin starts the game
socket.on("start-game", function (playersxy) {
  // change players position
  playersxy.forEach(function (cplayer) {
    if (cplayer.id !== player.id) {
      getUserById(players, cplayer.id).pos.x = cplayer.x;
      getUserById(players, cplayer.id).pos.y = cplayer.y;
    } else {
      player.pos.x = cplayer.x;
      player.pos.y = cplayer.y;
    }
  });

  clientState.gameStartTime = performance.now();

  // other game starting stuff
  clientState.gameStarted = true;
  lobbyDiv.style.display = "none";
  canvasDiv.style.display = "block";
  resultsDiv.style.display = "none";
  // joymain.style.display = "flex";
  document.title = "Bob vs Bob";

  changeCanvasSize();

  lastUpdate = performance.now();
  redraw();
});

socket.on("stop-game", function () {
  // screen and client setup
  canvasDiv.style.display = "none";
  lobbyDiv.style.display = "block";
  resultsDiv.style.display = "block";
  joymain.style.display = "none";
  document.title = "Lobby - Bob vs Bob";
  createResultsScreen(users, user);
  clientState.gameStarted = false;

  // weapon setup
  player.mainWeapon.bullets = player.mainWeapon.maxBullets;
  player.sideWeapon.bullets = player.sideWeapon.maxBullets;
  player.thirdWeapon.bullets = player.thirdWeapon.maxBullets;
  player.mainWeapon.remainingBullets = 90;
  player.sideWeapon.remainingBullets = 100;
  player.weapon = player.mainWeapon;
  // reload setup
  lastShot = 1000;
  lastReload = 2000;
  reloading = false;
  // health setup
  player.health = 100;

  players.forEach(function (cplayer) {
    cplayer.health = 100;
  });
  // reset damage and kills
  user.kills = 0;
  user.damage = 0;
  users.forEach(function (cuser) {
    cuser.kills = 0;
    cuser.damage = 0;
  });
});

// when player starts moving
socket.on("start-move", function ({ id, dir, x, y }) {
  const cplayer = getUserById(players, id);
  cplayer.pos.x = x;
  cplayer.pos.y = y;
  cplayer.movement.dir = dir;
});

// when player stops moving
socket.on("stop-move", function ({ id, x, y }) {
  const cplayer = getUserById(players, id);
  cplayer.pos.x = x;
  cplayer.pos.y = y;
  cplayer.movement.dir = "";
});

// when other client shoots
socket.on("shoot", function ({ fromX, fromY, toX, toY, id }) {
  getUserById(players, id).shoot = { shoot: true, fromX, fromY, toX, toY };
});

// when other client shoots
socket.on(
  "shoot-hit",
  function ({ fromX, fromY, toX, toY, sendId, hitId, damage, drawable }) {
    if (drawable) {
      getUserById(players, sendId).shoot = {
        shoot: true,
        fromX,
        fromY,
        toX,
        toY,
      };
    }
    if (hitId === player.id) {
      player.health -= damage;
      getUserById(users, sendId).damage += damage;
    } else {
      getUserById(players, hitId).health -= damage;
      getUserById(users, sendId).damage += damage;
    }
  }
);

// when other client shoots rpg
socket.on("rpg-shoot", function ({ x, y, id }) {
  getUserById(players, id).rpgShoot = { shoot: true, x, y };
});

// when someone respawns
socket.on("respawn", function ({ sendId, hitId, x, y }) {
  if (player.id === hitId) {
    player.pos.x = x;
    player.pos.y = y;
    player.health = 100;
    reloading = false;
    lastReload = 2430;
    player.mainWeapon.bullets = player.mainWeapon.maxBullets;
    player.sideWeapon.bullets = player.sideWeapon.maxBullets;
    player.thirdWeapon.bullets = player.thirdWeapon.maxBullets;
    player.mainWeapon.remainingBullets = 90;
    player.sideWeapon.remainingBullets = 100;
    player.weapon = player.mainWeapon;

    getUserById(users, sendId).kills++;
  } else {
    const cplayer = getUserById(players, hitId);
    cplayer.pos.x = x;
    cplayer.pos.y = y;
    cplayer.health = 100;

    if (sendId === user.id) {
      user.kills++;
    } else {
      getUserById(users, sendId).kills++;
    }
  }
});

// if user is diconnected from the server
socket.on("disconnect", function () {
  if (errDiv.style.display !== "block") {
    errDiv.style.display = "block";
    errMsg.innerHTML = "Disconnected <br> <a href='/'>Back to menu</a>";
    lobbyDiv.style.display = "none";
    canvasDiv.style.display = "none";
    resultsDiv.style.display = "none";
  }
  clientState.gameStarted = false;
});

window.addEventListener("resize", changeCanvasSize);

window.onresize = function () {
  document.body.height = window.innerHeight;
};
window.onresize(); // called to initially set the height.

function changeCanvasSize() {
  if (window.innerWidth * 9 < window.innerHeight * 16) {
    canvas.style.width = "100vw";
    canvas.style.height = `${(100 / 16) * 9}vw`;
  } else {
    canvas.style.width = `${(100 / 9) * 16}vh`;
    canvas.style.height = "100vh";
  }
}
