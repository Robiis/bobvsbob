// settings
focus();
let canvasWidth = 1600;// in shooting.js it needs the REAL size of canvas, bacause sometimes style.css changes it
let canvasHeight = 900; // the REAL size of canvas.
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let reloadPressed = false;
let leaderboardPressed = false;
let mapPressed = false;
let weaponChange = false;
let infoPressed = false;
let canvasMagnificationRatio = 2;//how many canvasMagnificationRatio ** 2 times canvas is bigger than the camera
let mousePos = {
  x: 0,
  y: 0
}
let currentClosePoints = []; // the closest points from player to an obstacle(or to a player)
let closePList = []; // the closest point from player to all obstacles and players
let coefficient; // the slope of player's shooting trajectory
let lastShot = 10; // time lasted from the last shot(in milliseconds)
let lastReload = 2000; // time since last reload
let reloading = false; // if reloading
let shake = {
  x: 0,
  y: 0
}; // camera shake, in px
let focused = true;

// images
const bulletIcon = new Image();
bulletIcon.src = "bulletIcon.png";
const ak = new Image();
ak.src = "ak.png";
const glock = new Image();
glock.src = "glock.png";
const rpg = new Image();
rpg.src = "rpg.png";
const frame = new Image();
frame.src = "frame.png";
const info = new Image();
info.src = "help.png";
const timeIcon = new Image();
timeIcon.src = "timeIcon.png";

gaidaAtteluIeladi(function() {}, bulletIcon, ak, glock, frame, info, rpg, timeIcon);

// constants
const decreaseDamageRatio = 3; // decrease the damage dealt
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const KeyboardHelper = {
  left: 65,
  right: 68,
  up: 87,
  down: 83,
  reload: 82,
  leaderboard: 81,
  map: 69,
  mainW: 49,
  sideW: 50,
  thirdW: 51,
  info: 70
};
const mapSize = {
  width: 4000,
  height: 3000
}
const weapon = {
  ak: {
    rateOfFire: 1000/10,// 10 reizes sekundē, so katru 100 ms var izšaut vienu reizi
    damage: 33/decreaseDamageRatio,// damage dealt with each bullet
    reloadTime: 2430, // reload time in milliseconds
    bullets: 30, 
    maxBullets: 30,
    img: ak,
    shootingDist: 500,
    shootingMinDist: 0,
    spray: Math.PI / 180 * 5, // weapon's deviation, in degrees. Pēdējais koeficients norāda par cik grādiem ir spray
    wWidth: 7,
    wLength: 30,
    wColor: "rgb(200, 115, 29)"
  },
  glock:{
    rateOfFire: 1000/6.7,
    damage: 24/decreaseDamageRatio,
    reloadTime: 1570,
    bullets: 20,
    maxBullets: 20,
    img: glock,
    shootingDist: 300,
    shootingMinDist: 0,
    spray: Math.PI / 180 * 2, // weapon's deviation, in degrees.
    wWidth: 5,
    wLength: 20,
    wColor: "rgb(100, 113, 124)"
  },
  rpg:{
    rateOfFire: 1000/0.5,
    damage: 50,
    reloadTime: 4000,
    bullets: 5,
    maxBullets: 5,
    img: rpg,
    shootingDist: 450,
    shootingMinDist: 250,
    damageRadius: 100, // radius of explosion
    spray: Math.PI / 180 * 0, // weapon's deviation, in degrees.
    wWidth: 8,
    wLength: 33,
    wColor: "rgb(42, 179, 115)"
  }
}
const bgs = [
  {
    x1: 1600,
    y1: 0,
    x2: 4000,
    y2: 0,
    x3: 4000,
    y3: 3000,
    color: "#9CC3D5FF"
  },
  {
    x1: 0,
    y1: 3000,
    x2: 2400,
    y2: 1000,
    x3: 4000,
    y3: 3000,
    color: "#D4B996FF"
  }
];
const shakeLength = 3; // for how many pixels camera shakes diagonally
const speeed = 1;
// obstacles
const obstacles = [
  // borders
  new obstacle(0, - 1, mapSize.width, 1, "", false), // upper border
  new obstacle(0, mapSize.height, mapSize.width, 1, "", false), // lower border
  new obstacle(-1, 0, 1, mapSize.height, "", false), // left border
  new obstacle(mapSize.width, 0, 1, mapSize.height, "", false), // right border

  // forest obstacles
  new obstacle(200, 100, 500, 300, "#2C5F2D"),
  new obstacle(700, 500, 300, 300, "#2C5F2D"),
  new obstacle(100, 500, 300, 500, "#2C5F2D"),
  new obstacle(500, 900, 400, 700, "#2C5F2D"),
  new obstacle(1100, 100, 350, 600, "#2C5F2D"),

  // winter obstacles
  new obstacle(2700, 200, 250, 600, "#0063B2FF"),
  new obstacle(3000, 950, 250, 500, "#0063B2FF"),
  new obstacle(3100, 150, 600, 400, "#0063B2FF"),
  new obstacle(3500, 1000, 400, 500, "#0063B2FF"),
  new obstacle(3500, 650, 400, 250, "#0063B2FF"),

  // desert obstacles
  new obstacle(1700, 2350, 400, 200, "#A07855FF"),
  new obstacle(1900, 2650, 400, 200, "#A07855FF"),
  new obstacle(1700, 1700, 600, 350, "#A07855FF"),
  new obstacle(1300, 2200, 300, 600, "#A07855FF"),
  new obstacle(2400, 2200, 300, 600, "#A07855FF")
]

// eventListeners
document.addEventListener("keydown", keyDownChecker, false);
document.addEventListener("keyup", keyUpChecker, false);
// gets the coords of mouse
document.addEventListener("mousemove", function(event){
  mousePos.x = event.clientX;
  mousePos.y = event.clientY;
}, false);
// if click, then shooting check
document.addEventListener("mousedown", function(event) {
  if (event.button === 0){ // the left mouse button
    player.shootYes = true;
    if (player.scope){
      player.scope = "hidden";
    }
  } else if (event.button === 2){
    if (player.scope){
      player.scope = false;
    }else{
      player.scope = true;
    }
    player.shootYes = false
  }
}, false)
document.addEventListener("mouseup", function(event) {
  if (event.button === 0){ // the left mouse button
    player.shootYes = false;
    if (player.scope === "hidden"){
      player.scope = true;
    }
  }
}, false);
document.addEventListener("wheel", function(event){
  if (player.weapon == player.mainWeapon){
    player.weapon = player.sideWeapon;
  } else if (player.weapon == player.sideWeapon){
    player.weapon = player.thirdWeapon;
  } else if (player.weapon == player.thirdWeapon){
    player.weapon = player.mainWeapon;
  }
  weaponChange = true;
})
// remove right click default actions
window.addEventListener("contextmenu", function (e) { e.preventDefault() }, false);
// checks if document has focus
window.onblur = function() {
  rightPressed = false;
  leftPressed = false;
  downPressed = false;
  upPressed = false; 
  if (clientState.gameStarted) {
    socket.emit("stop-move", { x: player.pos.x, y: player.pos.y });
  }
}
// loop--------------------------------------------------------------------------------------------------------------
let now, dt;
function redraw() {
  now = performance.now();
  dt = now - lastUpdate;
  dirChange();

  // moves players
  movePlayer(player, dt);
  players.forEach(function(cplayer) {
    movePlayer(cplayer, dt);
  });

  // checks if players collide with obstacles
  //clientObsCheck(player);
  borderCheck(player);
  players.forEach(function(cplayer) {
    //clientObsCheck(cplayer);
    borderCheck(cplayer);
  });

  // camera movement
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // clears canvas
  ctx.clearRect(-0.5*mapSize.width, -0.5*mapSize.height, mapSize.width, mapSize.height);

  // camera movement
  const camX = clamp(-player.pos.x + canvas.width/2 - shake.x, -0.5 * (mapSize.width - canvas.width), 0.5 * (mapSize.width + canvas.width));
  const camY = clamp(-player.pos.y + canvas.height/2 - shake.y, -0.5 * (mapSize.height - canvas.height), 0.5 * (mapSize.height + canvas.height));
  ctx.translate(camX, camY);

  // resets camera shake
  if (shake.x !== 0 && shake.y !== 0){
    shake.x = 0;
    shake.y = 0;
  }

  // background
  ctx.fillStyle = "#97BC62FF";
  ctx.fillRect(-mapSize.width/2, -mapSize.height/2, mapSize.width, mapSize.height);

  bgs.forEach(function(bg) {
    ctx.fillStyle = bg.color;
    ctx.triangle(bg.x1 - mapSize.width/2, bg.y1 - mapSize.height/2, bg.x2 - mapSize.width/2, bg.y2 - mapSize.height/2, bg.x3 - mapSize.width/2, bg.y3 - mapSize.height/2).fill();
  });

  // mouse
  mouseCoordsGet();
    
  //draws obstacles
  obstacles.forEach(function(obs) {
    obs.draw();
  });

  // shooting check
  if ((player.shootYes === true && performance.now() - lastShot >= player.weapon.rateOfFire && reloading !== true && player.weapon.bullets > 0) || player.scope === true) {
    shootingCheck(player.shootYes); // if player is really shooting(not scope), then take damage from enemy
    if (player.shootYes === true){
      cameraShake();
      lastShot = performance.now();
      player.weapon.bullets--; 
    }
  }

  // reloading
  if (reloadPressed && player.weapon.bullets !== player.weapon.maxBullets && reloading !== true) {
    reloading = true;
    lastReload = performance.now();
  }
  if (reloading === true && performance.now() - lastReload >= player.weapon.reloadTime) {
    reloading = false;
    player.weapon.bullets = player.weapon.maxBullets;
  }
  if (weaponChange){  // if you change weapon, the reload stops
    reloading = false;
    weaponChange = false;
  }

  // draws players
  players.forEach(function(cplayer) {
    if (cplayer.shoot.shoot) {
      cplayer.shoot.shoot = false;
      if (cplayer.weapon != cplayer.thirdWeapon){
        bulletTrail(cplayer.shoot.fromX, cplayer.shoot.fromY, cplayer.shoot.toX, cplayer.shoot.toY, "black", 3);
      }
    }
    cplayer.draw_body();
    cplayer.draw_name();
    cplayer.draw_health();
  });
  player.draw_weapon();
  player.draw_body();
  player.draw_name();
  player.draw_health();

  // draw the ui
  if (leaderboardPressed) {
    drawInfoScreen(camX, camY, users, user);
  }
  if (infoPressed){
    informationUi(camX, camY);
  }
  drawWeaponComplex(reloading, player.weapon.reloadTime, lastReload, player.weapon.bullets, camX, camY);
  if (mapPressed) {
    drawMiniMap(300, 75, 1000, 750, camX, camY, player, players, obstacles, bgs, true);
  } else {
    drawMiniMap(1270, 30, 300, 225, camX, camY, player, players, obstacles, bgs, false);
  }
  drawTimer(camX, camY, clientState.gameStartTime, clientState.gameLength, timeIcon);

  lastUpdate = now;
  if (clientState.gameStarted) {
    requestAnimationFrame(redraw);
  }
}

/*
basic level:
camera movement -- done
map design -- kinda done
map store -- no need 
border -- yeah kinda done
map store -- kas tas tads jason, es nezinu lol
shooting -- done  
HP -- done
obstacles -- done
cartoon rooftop top view -- done
mape -- done by robis

advenced level:
camera shake -- done
ieroči, scroll -- done
grenade(goes through walls) -- not now
help ui --  done
weapon spray -- done
players' obs check -- done
sounds -- 
random damage --
grenade
advanced spray(weapon follows bulletTrail) --
*/