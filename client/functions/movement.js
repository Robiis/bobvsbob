// changes the player's direction
/*function dirChange(){
  if (rightPressed){
    player.movement.dir = 1;
  }
  if (leftPressed){
    player.movement.dir = 2;
  }
  if (upPressed){
    player.movement.dir = 3;
  }
  if (downPressed){
    player.movement.dir = 4;
  }
  if (reloadPressed){
    console.log(5);
  }
}*/

function dirChange(){
  if (rightPressed){
    player.x += 5;
  }
  if (leftPressed){
    player.x -= 5;
  }
  if (upPressed){
    player.y -= 5;
  }
  if (downPressed){
    player.y += 5;
  }
  if (reloadPressed){
    console.log(5);
  }
}

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