// settings
focus();
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let reloadPressed = false;
let infoPressed = false;
let canvasMagnificationRatio = 2;//how many canvasMagnificationRatio ** 2 times canvas is bigger than the camera
let obstacles = [];

// images
const roof = new Image();
roof.src = "roofBlue.png";

gaidaAtteluIeladi(function() {}, roof);

// obstacles
obstacles.push(
  new obstacle(200, 200, true, roof,  "roofBlue", 0, 0),
  new obstacle((1-canvasMagnificationRatio) * canvas.width, -canvas.height - 1, false,"","", canvasMagnificationRatio * canvas.width, 5),//upper border
  new obstacle((1-canvasMagnificationRatio) * canvas.width, canvas.height, false,"","", canvasMagnificationRatio * canvas.width, 5),//lower border
  new obstacle((1-canvasMagnificationRatio) * canvas.width - 1, (1-canvasMagnificationRatio) * canvas.height, false,"","", 5, canvasMagnificationRatio * canvas.height),//left border
  new obstacle(canvas.width, (1-canvasMagnificationRatio) * canvas.height, false,"","", 5, canvasMagnificationRatio * canvas.height)//right border

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

// loop--------------------------------------------------------------------------------------------------------------
function redraw() {
  let now = performance.now();
  let dt = now - lastUpdate;

  dirChange();
  movePlayer(player);
  players.forEach(function(cplayer) {
    movePlayer(cplayer);
  });
  borderCheck(player);

  players.forEach(function(cplayer) {
    borderCheck(cplayer);
  });

  // camera movement
  ctx.setTransform(1, 0, 0, 1, 0, 0);//////////////matrix
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // camera movement
  var camX = clamp(-player.pos.x + canvas.width/2, 0, canvasMagnificationRatio * canvas.width - canvas.width);
  var camY = clamp(-player.pos.y + canvas.height/2, 0, canvasMagnificationRatio * canvas.height - canvas.height);
  ctx.translate(camX, camY);

  //draws map
  obstacles.forEach(function(obs){
    if (obs.drawable){
      obs.draw();
    }
  });
  
  ctx.fillRect(-25,-25,50,50)
  ctx.fillRect(-25 - canvas.width,-25 - canvas.height,50,50)

  players.forEach(function(cplayer) {
    cplayer.draw_body();
  });
  player.draw_body();

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
map store -- kas tas tads jason
border -- 
shooting --
HP -- 
obsticles --
ieroči --
cartoon rooftop top view -- done
*/