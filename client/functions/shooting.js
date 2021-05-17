// gets position of the mouse
function mouseCoordsGet() {
  if (window.innerWidth <= 1200 && canvasWidth != 800){
    canvasWidth = 800;
    canvasHeight = 450;
    ratio = 2;
  } else if (window.innerWidth <= 1600 && window.innerWidth > 1200 && canvasWidth != 1200){
    canvasWidth = 1200;
    canvasHeight = 675;
  } else if (window.innerWidth > 1600 && canvasWidth != 1600){
    canvasWidth = 1600;
    canvasHeight = 900;
  }
  player.lastMouseX = (mousePos.x - canvas.offsetLeft) + player.pos.x - 0.5 * canvasWidth;
  player.lastMouseY = (mousePos.y - canvas.offsetTop) + player.pos.y - 0.5 * canvasHeight;
}

// the most important part of this game - the shooting check
function shootingCheck(shoot) {
  if (shoot === false){
      trailColor = "rgb(255, 0, 0)";
      trailWidth = 2;
      //player.theta = player.theta
  } else{
      trailColor = "black";
      trailWidth = 3;
      player.theta += Math.random() * (player.weapon.spray + player.weapon.spray) - player.weapon.spray;
    }
  let coefficient = Math.tan(0 - player.theta);
  //trigonometry shit
  //gets the end point coords, if trajectory doesn't hit any obs or player
  let eX = Math.cos(player.theta) * player.weapon.shootingDist;
  let eY = Math.sin(player.theta) * player.weapon.shootingDist;
  //pushs this end point into the closest points' list, so that if no crosspoint with obs, then this will be the endpoint of trajectory
  closePList.push(eX ** 2 + eY ** 2);
  //checks the closest crosspoint with trajectory
  if (player.weapon != player.thirdWeapon){
    obstacles.forEach(function(obs) {
        //angles from player's center to these vertex points
        let angleLU = Math.atan2(obs.lu[1] - player.pos.y, obs.lu[0] - player.pos.x);
        let angleRU = Math.atan2(obs.ru[1] - player.pos.y, obs.ru[0] - player.pos.x);
        let angleLD = Math.atan2(obs.ld[1] - player.pos.y, obs.ld[0] - player.pos.x);
        let angleRD = Math.atan2(obs.rd[1] - player.pos.y, obs.rd[0] - player.pos.x);
        //this huge IF checks in which point trajectory crosses the obs
        //if obs is on the right side of player
            if (obs.x > player.pos.x) {
            if (obs.y + obs.height < player.pos.y) { //if obs is above player
                //in this case the biggest angle is lu and rd, the LD is in the middles
                if (player.theta >= angleLU && player.theta <= angleRD && player.theta <= angleLD) { //left of obs
                    currentClosePoints.push((obs.x - player.pos.x) ** 2 + (-coefficient * (obs.x - player.pos.x)) ** 2);
                } else if (player.theta >= angleLU && player.theta <= angleRD && player.theta >= angleLD) { //down
                    currentClosePoints.push((-(obs.y + obs.height - player.pos.y) / coefficient) ** 2 + (obs.y + obs.height - player.pos.y) ** 2);
                };
            } else if (obs.y > player.pos.y) { //if it's under player
                if (player.theta >= angleRU && player.theta <= angleLD && player.theta >= angleLU) { //left
                    currentClosePoints.push((obs.x - player.pos.x) ** 2 + (-coefficient * (obs.x - player.pos.x)) ** 2);
                } else if (player.theta >= angleRU && player.theta <= angleLD && player.theta <= angleLU) { //up
                    currentClosePoints.push((-(obs.y - player.pos.y) / coefficient) ** 2 + (obs.y - player.pos.y) ** 2);
                };
            } else if (obs.y + obs.height >= player.pos.y && obs.y <= player.pos.y) { //if obs is on the y = player.pos.y line
                if (player.theta >= angleLU && player.theta <= angleLD) { //left
                    currentClosePoints.push((obs.x - player.pos.x) ** 2 + (-coefficient * (obs.x - player.pos.x)) ** 2);
                };
            };
        }
        //if obs is on the left side of player
        else if (obs.x + obs.width < player.pos.x) {
            if (obs.y + obs.height < player.pos.y) { //if obs is above player
                //in this case the biggest angle is lu and rd, the RD is in the middles
                if (player.theta >= angleLD && player.theta <= angleRU && player.theta <= angleRD) { //down of obs
                    currentClosePoints.push((-(obs.y + obs.height - player.pos.y) / coefficient) ** 2 + (obs.y + obs.height - player.pos.y) ** 2);
                } else if (player.theta >= angleLD && player.theta <= angleRU && player.theta >= angleRD) { //right
                    currentClosePoints.push((-player.pos.x + obs.x + obs.width) ** 2 + (coefficient * (player.pos.x - obs.x - obs.width)) ** 2);
                };
            } else if (obs.y > player.pos.y) { //if it's under player
                if (player.theta >= angleRD && player.theta <= angleLU && player.theta >= angleRU) { //up
                    currentClosePoints.push((-(obs.y - player.pos.y) / coefficient) ** 2 + (obs.y - player.pos.y) ** 2);
                } else if (player.theta >= angleRD && player.theta <= angleLU && player.theta <= angleRU) { //right
                    currentClosePoints.push((-player.pos.x + obs.x + obs.width) ** 2 + (coefficient * (player.pos.x - obs.x - obs.width)) ** 2);
                }
            } else if (obs.y + obs.height >= player.pos.y && obs.y <= player.pos.y) { //if obs is on the y = player.pos.y line
                if (player.theta >= angleRD || player.theta <= angleRU) { //right
                    currentClosePoints.push((-player.pos.x + obs.x + obs.width) ** 2 + (coefficient * (player.pos.x - obs.x - obs.width)) ** 2);
                };
            }
        }
        //if obs is in the same x line with player
        else if (obs.x + obs.width >= player.pos.x && obs.x < player.pos.x) {
            if (obs.y + obs.height < player.pos.y) { //above
                if (player.theta == 1 / 2 * (0 - Math.PI)) { //if k --> -OO
                    currentClosePoints.push((player.pos.y - obs.y - obs.height) ** 2);
                };
                if (player.theta >= angleLD && player.theta <= angleRD) { //else, i.e. down
                    currentClosePoints.push((-(obs.y + obs.height - player.pos.y) / coefficient) ** 2 + (obs.y + obs.height - player.pos.y) ** 2);
                };
            } else if (obs.y > player.pos.y) { //under
                if (player.theta == 1 / 2 * Math.PI) { //if k --> OO
                    currentClosePoints.push((obs.y - player.pos.y) ** 2);
                };
                if (player.theta >= angleRU && player.theta <= angleLU) { //else, i.e. up
                    currentClosePoints.push((-(obs.y - player.pos.y) / coefficient) ** 2 + (obs.y - player.pos.y) ** 2);
                };
            }
        };

        //console.log(currentClosePoints);
        //sorts the list from small to large
        currentClosePoints.sort(function(a, b) {
            return a - b
        });
        //if the smallest one(the length from player to the crosspoint) is shorter than player's shooting distance
        //then it can get shoot, so push it into the "main" list
        if (currentClosePoints[0] <= player.weapon.shootingDist ** 2) {
            closePList.push(currentClosePoints[0]);
        };
        //cleat this so that we can reuse it
        currentClosePoints = [];
      });
  
  }
    

  //checks if shoots at player
  players.forEach(function(enemy) {
    //"angle" - angle watching from player's center to enemy, parallel to x axis
    //angleDelta - angle between "angle" and tangent of enemy
    // distance -- length between players' centers
    //just draw and try to understand
    let distance = ((enemy.pos.y - player.pos.y) ** 2 + (enemy.pos.x - player.pos.x) ** 2) ** 0.5;
    let angle = Math.atan2(enemy.pos.y - player.pos.y, enemy.pos.x - player.pos.x);
    let angleDelta = Math.asin(enemy.r / distance);
    let angleLarge = angle + angleDelta;
    let angleSmall = angle - angleDelta;
    let alpha = Math.abs(player.theta - angle);
    let b = Math.sin(alpha) * distance;
    let a = Math.sqrt(enemy.r ** 2 - b ** 2);

    //if enemy and player are not the same player 
    if (enemy.pos.x != player.pos.x || enemy.pos.y != player.pos.y) {
        //If both large and small angle are -PI < x < PI
        if (angleLarge <= Math.PI && angleSmall >= -Math.PI) {
            if (player.theta >= angleSmall && player.theta <= angleLarge) {
                currentClosePoints.push((Math.sqrt(distance ** 2 - b ** 2) - a) ** 2);
            };
        }
        //if the bigger angle is more than PI radians 
        else if (angleLarge > Math.PI) {
            if (player.theta >= angleSmall || player.theta <= angleLarge - 2 * Math.PI) {
                currentClosePoints.push((Math.sqrt(distance ** 2 - b ** 2) - a) ** 2);
            }
        }
        //if the smaller angle is less than -PI radians 
        else if (angleSmall < -Math.PI) {
            if (player.theta <= angleLarge || player.theta >= angleSmall + 2 * Math.PI) {
                currentClosePoints.push((Math.sqrt(distance ** 2 - b ** 2) - a) ** 2);
            }
        }
    }

    //sorts the list from small to large
    currentClosePoints.sort(function(a, b) {
        return a - b
    });
    //if the smallest one(the length from player to the crosspoint) is shorter than player's shooting distance
    //then it can get shoot, so push it into the "main" list
    if (currentClosePoints[0] <= player.weapon.shootingDist ** 2 && currentClosePoints[0] >= player.weapon.shootingMinDist ** 2) {
        closePList.push(currentClosePoints[0]);
        enemy.crossPointDistance = currentClosePoints[0];
    } else if (player.weapon == player.thirdWeapon){
        if (Math.sqrt((enemy.pos.x - player.pos.x - eX) ** 2 + (enemy.pos.y - player.pos.y - eY) ** 2) <= player.weapon.damageRadius){
            if (shoot && enemy.health > 0){
                shootSendHit(player.pos.x, player.pos.y, player.pos.x + Math.cos(player.theta) * (closePList[0] ** 0.5), player.pos.y + Math.sin(player.theta) * (closePList[0] ** 0.5), enemy.id, player.weapon.damage);
                enemy.health -= player.weapon.damage;
                user.damage += player.weapon.damage;
                if (enemy.health < 0) {
                    enemy.health = 0;
                }
            }
        }
    }
    //cleat this so that we can reuse it
    currentClosePoints = [];
  });


  //sorts the list from small to large
  closePList.sort(function(a, b) {
      return a - b;
  });

  // draw a bullet trail and send bullet trail to other clients
  if (player.weapon != player.thirdWeapon){
    bulletTrail(player.pos.x, player.pos.y, player.pos.x + Math.cos(player.theta) * (closePList[0] ** 0.5), player.pos.y + Math.sin(player.theta) * (closePList[0] ** 0.5), trailColor, trailWidth);
  } else{
    rangeWeapon(player.pos.x + Math.cos(player.theta) * (closePList[0] ** 0.5), player.pos.y + Math.sin(player.theta) * (closePList[0] ** 0.5),player.weapon.damageRadius, trailColor, 3);
  }

  //tells if the player is hurt
  players.forEach(function(cplayer) {
      if (cplayer.crossPointDistance === closePList[0] && shoot === true && cplayer.health > 0) {
        let b = Math.floor(Math.random() * (bias.max-bias.min+1)) + bias.min;
        shootSendHit(player.pos.x, player.pos.y, player.pos.x + Math.cos(player.theta) * (closePList[0] ** 0.5), player.pos.y + Math.sin(player.theta) * (closePList[0] ** 0.5), cplayer.id, player.weapon.damage + b);
        cplayer.health -= (player.weapon.damage + b);
        user.damage += (player.weapon.damage + b);
         if (cplayer.health < 0) {
            cplayer.health = 0;
        }
      } else {
          if (shoot){
            shootSend(player.pos.x, player.pos.y, player.pos.x + Math.cos(player.theta) * (closePList[0] ** 0.5), player.pos.y + Math.sin(player.theta) * (closePList[0] ** 0.5));
          }
      }
      cplayer.crossPointDistance = 0;
  });
  //clear this so that we can reuse it
  closePList = [];
}

// bullet trail
function bulletTrail(fromX, fromY, toX, toY, color, width) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  ctx.closePath();
}

function rangeWeapon(x,y,r,color, width){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

// camera shake
function cameraShake(){
    if (player.theta < -0.5 * Math.PI){
        alpha = Math.PI - Math.abs(player.theta);
        shake.x = Math.cos(alpha) * shakeLength;
        shake.y = Math.sin(alpha) * shakeLength;
    } else if (player.theta > -0.5 * Math.PI && player.theta < 0){
        alpha = Math.abs(player.theta);
        shake.x = -Math.cos(alpha) * shakeLength;
        shake.y = Math.sin(alpha) * shakeLength;
    } else if (player.theta < 0.5 * Math.PI && player.theta > 0){
        //alpha = Math.abs(player.theta);
        shake.x = -Math.cos(player.theta) * shakeLength;
        shake.y = -Math.sin(player.theta) * shakeLength;
    } else if (player.theta > 0.5 * Math.PI){
        alpha = Math.abs(Math.PI - player.theta);
        shake.x = Math.cos(alpha) * shakeLength;
        shake.y = -Math.sin(alpha) * shakeLength;
    } else if (player.theta == -0.5 * Math.PI){
        shake.x = 0;
        shake.y = -shakeLength;
    } else if (player.theta == 0){
        shake.x = shakeLength;
        shake.y = 0;
    } else if (player.theta == 0.5 * Math.PI){
        shake.x = 0;
        shake.y = shakeLength;
    }
}
