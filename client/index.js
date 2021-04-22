// settings
focus();
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let reloadPressed = false;
let canvasMagnificationRatio = 2;//how many canvasMagnificationRatio ** 2 times canvas is bigger than the camera
let obstacles = [];

// images
const roof = new Image();
roof.src = "roofBlue.png";

gaidaAtteluIeladi(function() {}, roof);

// obstacles
obstacles.push(
  new obstacle(200, 200, roof,  "roofBlue", true),
  new obstacle((1-canvasMagnificationRatio) * canvas.width, -canvas.height - 1, canvasMagnificationRatio * canvas.width, 5, false),//upper border
  new obstacle((1-canvasMagnificationRatio) * canvas.width, canvas.height, canvasMagnificationRatio * canvas.width, 5, false),//lower border
  new obstacle((1-canvasMagnificationRatio) * canvas.width - 1, (1-canvasMagnificationRatio) * canvas.height, 5, canvasMagnificationRatio * canvas.height, false),//left border
  new obstacle(canvas.width, (1-canvasMagnificationRatio) * canvas.height, 5, canvasMagnificationRatio * canvas.height, false)//right border

);

// constants
const KeyboardHelper = {
  left: 65,
  right: 68,
  up: 87,
  down: 83,
  reload: 82
}; // A, D, W, S

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

  // camera movement
  ctx.setTransform(1,0,0,1,0,0);//////////////matrix
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // text on screen
  // ctx.fillText(`${user.pos.x}, ${user.pos.y}`, 50, 50);
  // let count = 50;
  // users.forEach(function(cuser) {
  //   count += 50;
  //   ctx.fillText(`${cuser.pos.x}, ${cuser.pos.y}`, 50, count);
  // });
  ctx.fillText(player.movement.dir, 50, 50);

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

  player.draw_body();
  players.forEach(function(cplayer) {
    cplayer.draw_body();
  });

  lastUpdate = now;
  if (clientState.gameStarted) {
    requestAnimationFrame(redraw);
  }
}

/*
camera movement -- done
map design -- kinda done
map store -- no need ur mom
border -- 
shooting --
HP -- 
obsticles --
ieroči --
cartoon rooftop top view -- done
*/