// controls all the movement
function keyDownChecker(event) {
    if (event.keyCode == KeyboardHelper.right) {
        rightPressed = true;
    }
    if (event.keyCode == KeyboardHelper.left) {
        leftPressed = true;
    }
    if (event.keyCode == KeyboardHelper.down) {
        downPressed = true;
    }
    if (event.keyCode == KeyboardHelper.up) {
        upPressed = true;
    }
    if (event.keyCode == KeyboardHelper.leaderboard) {
        leaderboardPressed = true;
    }
    if (event.keyCode == KeyboardHelper.reload) {
        reloadPressed = true;
    }
    if (event.keyCode == KeyboardHelper.map) {
        mapPressed = true;
    }
    if (event.keyCode == KeyboardHelper.mainW){
        player.weapon = player.mainWeapon;
        weaponChange = true;
    }
    if (event.keyCode == KeyboardHelper.sideW){
        player.weapon = player.sideWeapon;
        weaponChange = true;
    }
    if (event.keyCode == KeyboardHelper.thirdW){
        player.weapon = player.thirdWeapon;
        weaponChange = true;
    }
    if (event.keyCode == KeyboardHelper.info){
        infoPressed = true;
    }
  }
  
  function keyUpChecker(event) {
    if (event.keyCode == KeyboardHelper.right) {
        rightPressed = false;
    }
    if (event.keyCode == KeyboardHelper.left) {
        leftPressed = false;
    }
    if (event.keyCode == KeyboardHelper.down) {
        downPressed = false;
    }
    if (event.keyCode == KeyboardHelper.up) {
        upPressed = false;
    }
    if (event.keyCode == KeyboardHelper.up) {
        upPressed = false;
    };
    if (event.keyCode == KeyboardHelper.leaderboard) {
        leaderboardPressed = false;
    };
    if (event.keyCode == KeyboardHelper.reload) {
        reloadPressed = false;
    };
    if (event.keyCode == KeyboardHelper.map) {
        mapPressed = false;
    };
    if (event.keyCode == KeyboardHelper.info){
        infoPressed = false;
    }
  };