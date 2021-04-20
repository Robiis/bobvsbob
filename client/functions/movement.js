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
    socket.emit("dir", player.movement.dir);
  }
}

function movePlayer(player) {
  switch (player.movement.moveDir) {
    case "u":
      player.pos.y -= 10;
      break;
    case "d":
      player.pos.y += 10;
      break;
    case "r":
      player.pos.x += 10;
      break;
    case "l":
      player.pos.x -= 10;
      break;
    case "ur":
      player.pos.y -= 10;
      player.pos.x += 10;
      break;
    case "ul":
      player.pos.y -= 10;
      player.pos.x -= 10;
      break;
    case "dl":
      player.pos.y += 10;
      player.pos.x -= 10;
      break;
    case "dr":
      player.pos.y += 10;
      player.pos.x += 10;
      break;
    default:
      break;
  } 
}

function clamp(value, min, max){
  if(value < min) return min;
  else if(value > max) return max;
  return value;
}
