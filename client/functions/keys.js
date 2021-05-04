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
    if (event.keyCode == KeyboardHelper.info) {
        infoPressed = true;
    }
    if (event.keyCode == KeyboardHelper.reload) {
        reloadPressed = true;
    }
    if (event.keyCode == KeyboardHelper.map) {
        mapPressed = true;
    }
    if (event.keyCode == KeyboardHelper.mainW){
        player.weapon = player.mainWeapon;
    }
    if (event.keyCode == KeyboardHelper.sideW){
        player.weapon = player.sideWeapon;
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
    if (event.keyCode == KeyboardHelper.info) {
        infoPressed = false;
    };
    if (event.keyCode == KeyboardHelper.reload) {
        reloadPressed = false;
    };
    if (event.keyCode == KeyboardHelper.map) {
        mapPressed = false;
    };
  };