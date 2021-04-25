// gets position of the mouse
function mouseCoordsGet() {
  if (window.innerWidth <= 1200 && canvasWidth != 800){
    canvasWidth = 800;
    canvasHeight = 450;
  } else if (window.innerWidth <= 1600 && window.innerWidth > 1200 && canvasWidth != 1200){
    canvasWidth = 1200;
    canvasHeight = 675;
  } else if (window.innerWidth > 1600 && canvasWidth != 1600){
    canvasWidth = 1600;
    canvasHeight = 900;
  }
  player.lastMouseX = (mousePos.x - canvas.offsetLeft) + player.pos.x - canvasWidth * 0.5;
  player.lastMouseY = (mousePos.y - canvas.offsetTop) + player.pos.y - canvasHeight * 0.5;
}