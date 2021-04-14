// changes the player's direction
function dirChange(){
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
}

/*
right: dir = 1
left:  dir = 2 
up:    dir = 3
down:  dir = 4
*/