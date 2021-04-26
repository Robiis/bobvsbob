// settings
focus();
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let canvasWidth = 1600;// in shooting.js it needs the REAL size of canvas, bacause sometimes style.css changes it
let canvasHeight = 900; // the REAL size of canvas.
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let reloadPressed = false;
let infoPressed = false;
let canvasMagnificationRatio = 2;//how many canvasMagnificationRatio ** 2 times canvas is bigger than the camera
let obstacles = [];
let mousePos = {
  x: 0,
  y: 0
}
let currentClosePoints = []; // the closest points from player to an obstacle(or to a player)
let closePList = []; // the closest point from player to all obstacles and players
let coefficient; // the slope of player's shooting trajectory

// images
const roof = new Image();
roof.src = "roofBlue.png";

gaidaAtteluIeladi(function() {}, roof);

// obstacles
obstacles.push(
  new obstacle(200, 200, true, roof,  "roofBlue", 0, 0),
  new obstacle((1-canvasMagnificationRatio) * canvas.width, -canvas.height - 1, false,"","", canvasMagnificationRatio * canvas.width, 1),//upper border
  new obstacle((1-canvasMagnificationRatio) * canvas.width, canvas.height, false,"","", canvasMagnificationRatio * canvas.width, 1),//lower border
  new obstacle((1-canvasMagnificationRatio) * canvas.width - 1, (1-canvasMagnificationRatio) * canvas.height, false,"","", 1, canvasMagnificationRatio * canvas.height),//left border
  new obstacle(canvas.width, (1-canvasMagnificationRatio) * canvas.height, false,"","", 1, canvasMagnificationRatio * canvas.height)//right border
);

// constants
const KeyboardHelper = {
  left: 65,
  right: 68,
  up: 87,
  down: 83,
  reload: 82,
  info: 81
};

// eventListeners
document.addEventListener("keydown", keyDownChecker, false);
document.addEventListener("keyup", keyUpChecker, false);
// gets the coords of mouse
document.addEventListener("mousemove", function(event){
  mousePos.x = event.clientX;
  mousePos.y = event.clientY;
}, false);
// if click, then shooting check
document.addEventListener("mousedown", function() {
  player.shootYes = true;
}, false)
document.addEventListener("mouseup", function() {
  player.shootYes = false;
}, false);
// remove right click default actions
window.addEventListener("contextmenu", function (e) { e.preventDefault() }, false);
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
  borderCheck(player);
  players.forEach(function(cplayer) {
    borderCheck(cplayer);
  });

  // camera movement
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  // clears canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // camera movement
  var camX = clamp(-player.pos.x + canvas.width/2, 0, canvasMagnificationRatio * canvas.width - canvas.width);
  var camY = clamp(-player.pos.y + canvas.height/2, 0, canvasMagnificationRatio * canvas.height - canvas.height);
  ctx.translate(camX, camY);
  mouseCoordsGet();

  //draws obstacles
  obstacles.forEach(function(obs){
    if (obs.drawable){
      obs.draw();
    }
  });
  
  // this part will be deleted
  ctx.fillRect(-25,-25,50,50)
  ctx.fillRect(-25 - canvas.width,-25 - canvas.height,50,50)
  
  // shooting check
  if (player.shootYes === true) {
    shootingCheck();
  }

  // draws players
  players.forEach(function(cplayer) {
    if (cplayer.shoot.shoot) {
      cplayer.shoot.shoot = false;
      bulletTrail(cplayer.shoot.fromX, cplayer.shoot.fromY, cplayer.shoot.toX, cplayer.shoot.toY);
    }
    cplayer.draw_body();
    cplayer.draw_name();
  });
  player.draw_weapon();
  player.draw_body();
  player.draw_name();

  // info stuff
  if (infoPressed) {
    drawInfoScreen(camX, camY, player, players);
  }

  lastUpdate = now;
  if (clientState.gameStarted) {
    requestAnimationFrame(redraw);
  }
}

/*
camera movement -- done
map design -- kinda done
map store -- no need ur mom
border -- yeah kinda done
map store -- kas tas tads jason, tava mama
shooting --
HP -- 
obsticles -- done
ieroči -- 
cartoon rooftop top view -- done
*/