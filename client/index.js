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

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  map(50);
  dirChange();

  lastUpdate = now;
  requestAnimationFrame(redraw);
}

let lastUpdate = performance.now();
redraw();