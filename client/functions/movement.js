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
      console.log("start");
    } else {
      socket.emit("stop-move", { x: player.pos.x, y: player.pos.y });
      console.log("stop");
    }  
  }
}

function movePlayer(cplayer) {
  switch (cplayer.movement.dir) {
    case "u":
      cplayer.pos.y -= 5;
      break;
    case "d":
      cplayer.pos.y += 5;
      break;
    case "r":
      cplayer.pos.x += 5;
      break;
    case "l":
      cplayer.pos.x -= 5;
      break;
    case "ur":
      cplayer.pos.y -= 5 / Math.sqrt(2);
      cplayer.pos.x += 5 / Math.sqrt(2);
      break;
    case "ul":
      cplayer.pos.y -= 5 / Math.sqrt(2);
      cplayer.pos.x -= 5 / Math.sqrt(2);
      break;
    case "dl":
      cplayer.pos.y += 5 / Math.sqrt(2);
      cplayer.pos.x -= 5 / Math.sqrt(2);
      break;
    case "dr":
      cplayer.pos.y += 5 / Math.sqrt(2);
      cplayer.pos.x += 5 / Math.sqrt(2);
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