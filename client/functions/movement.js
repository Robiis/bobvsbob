// changes the player's direction
function dirChange() {
  player.movement.prevDir = player.movement.dir;

  if (upPressed && rightPressed) {
    player.movement.dir = "ur"
  } else if (downPressed && rightPressed) {
    player.movement.dir = "dr"
  } else if (downPressed && leftPressed) {
    player.movement.dir = "dl"
  } else if (upPressed && leftPressed) {
    player.movement.dir = "ul"
  } else if (upPressed) {
    player.movement.dir = "u";
  } else if (downPressed) {
    player.movement.dir = "d";
  } else if (leftPressed) {
    player.movement.dir = "l";
  } else if (rightPressed) {
    player.movement.dir = "r";
  } else {
    player.movement.dir = "";
  }

  if (player.movement.prevDir !== player.movement.dir) {
    if (player.movement.dir !== "") {
      socket.emit("start-move", { dir: player.movement.dir, x: player.pos.x, y: player.pos.y });
    } else {
      socket.emit("stop-move", { x: player.pos.x, y: player.pos.y });
    }  
  }
}

function movePlayer(cplayer, dt) {
  cplayer.theta = Math.atan2(cplayer.lastMouseY - cplayer.pos.y, cplayer.lastMouseX - cplayer.pos.x);
  dt = dt * 0.078;
  switch (cplayer.movement.dir) {
    case "u":
      cplayer.lastPos.y = cplayer.pos.y;
      cplayer.pos.y -= 5 * dt * speeed;
      break;
    case "d":
      cplayer.lastPos.y = cplayer.pos.y;
      cplayer.pos.y += 5 * dt * speeed;
      break;
    case "r":
      cplayer.lastPos.x = cplayer.pos.x;
      cplayer.pos.x += 5 * dt * speeed;
      break;
    case "l":
      cplayer.lastPos.x = cplayer.pos.x;
      cplayer.pos.x -= 5 * dt * speeed;
      break;
    case "ur":
      cplayer.lastPos.x = cplayer.pos.x;
      cplayer.lastPos.y = cplayer.pos.y;
      cplayer.pos.y -= 5 / Math.sqrt(2) * dt * speeed;
      cplayer.pos.x += 5 / Math.sqrt(2) * dt * speeed;
      break;
    case "ul":
      cplayer.lastPos.x = cplayer.pos.x;
      cplayer.lastPos.y = cplayer.pos.y;
      cplayer.pos.y -= 5 / Math.sqrt(2) * dt * speeed;
      cplayer.pos.x -= 5 / Math.sqrt(2) * dt * speeed;
      break;
    case "dl":
      cplayer.lastPos.x = cplayer.pos.x;
      cplayer.lastPos.y = cplayer.pos.y;
      cplayer.pos.y += 5 / Math.sqrt(2) * dt * speeed;
      cplayer.pos.x -= 5 / Math.sqrt(2) * dt * speeed;
      break;
    case "dr":
      cplayer.lastPos.x = cplayer.pos.x;
      cplayer.lastPos.y = cplayer.pos.y;
      cplayer.pos.y += 5 / Math.sqrt(2) * dt * speeed;
      cplayer.pos.x += 5 / Math.sqrt(2) * dt * speeed;
      break;
    default:
      if (cplayer.pos.x !== cplayer.lastPos.x && cplayer.pos.y !== cplayer.lastPos.y){
        cplayer.lastPos.x = cplayer.pos.x;
        cplayer.lastPos.y = cplayer.pos.y;
      }
      break;
  } 
}

// camera movement stuff
function clamp(value, min, max){
  if(value < min) return min;
  else if(value > max) return max;
  return value;
}