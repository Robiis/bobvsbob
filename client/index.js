// settings
focus();
let player = new client(50, 50, "#F38181", "hehe");
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let reloadPressed = false;
let canvasMagnificationRatio = 3;
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

  // camera movement
  ctx.setTransform(1,0,0,1,0,0);//////////////matrix
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // const camX = (-player.x + canvas.width / 2) / 1.2;//
  //const camY = (-player.y + canvas.height / 2) / 1.2;//
  // camera movement
  var camX = clamp(-player.x + canvas.width/2, 0, canvasMagnificationRatio * canvas.width - canvas.width);
  var camY = clamp(-player.y + canvas.height/2, 0, canvasMagnificationRatio * canvas.height - canvas.height);
  ctx.translate(camX, camY);///

  //draws map
  map(50, canvasMagnificationRatio);
  dirChange();

  ctx.fillRect(-25,-25,50,50)
  ctx.fillRect(-25 - canvas.width,-25 - canvas.height,50,50)
  player.draw_body();

  lastUpdate = now;
  requestAnimationFrame(redraw);
}

let lastUpdate = performance.now();
redraw();


/*
camera movement
map design
map store
border
shooting
HP
obsticles
ieroči


*/