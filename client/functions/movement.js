// changes the player's direction
function dirChange() {
  // player.movement.prevDir = player.movement.dir;

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
      player.pos.y -= 5;
      break;
    case "d":
      player.pos.y += 5;
      break;
    case "r":
      player.pos.x += 5;
      break;
    case "l":
      player.pos.x -= 5;
      break;
    case "ur":
      player.pos.y -= 5;
      player.pos.x += 5;
      break;
    case "ul":
      player.pos.y -= 5;
      player.pos.x -= 5;
      break;
    case "dl":
      player.pos.y += 5;
      player.pos.x -= 5;
      break;
    case "dr":
      player.pos.y += 5;
      player.pos.x += 5;
      break;
    default:
      break;
  } 
}

// // changes the player's direction
// function dirChange(){
//   if (upPressed){
//     player.movement.dir = "u";
//   }
//   if (downPressed){
//     player.movement.dir = "d";
//   }
//   if (rightPressed){
//     player.movement.dir = "r";
//   }
//   if (leftPressed){
//     player.movement.dir = "l";
//   }
//   if (upPressed && rightPressed) {
//     player.movement.dir = "ur"
//   }
//   if (downPressed && rightPressed) {
//     player.movement.dir = "dr"
//   }
//   if (downPressed && leftPressed) {
//     player.movement.dir = "dl"
//   }
//   if (upPressed && leftPressed) {
//     player.movement.dir = "ul"
//   }

function clamp(value, min, max){
  if(value < min) return min;
  else if(value > max) return max;
  return value;
}

/*
right: dir = 1
left:  dir = 2 
up:    dir = 3
down:  dir = 4
*/