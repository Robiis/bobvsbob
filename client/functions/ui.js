// draws an info screen
function drawInfoScreen(camX, camY, users, user) {
  const x = 288 - camX;
  const y = 162 - camY;
  const width = 1024;
  const height = 576;
  ctx.font = "80px sans-serif";
  ctx.fillStyle = "#272525";
  ctx.globalAlpha = 0.85;

  // draws screen
  ctx.fillRect(x, y, width, height);

  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.fillStyle = "white";

  ctx.fillText("LEADERBOARD", x + width/2, y + 130);

  ctx.font = "20px Arial";

  const tempUsers = [];
  tempUsers.push({
    username: user.username,
    kills: user.kills,
    id: user.id
  });
  users.forEach(function(cuser) {
    tempUsers.push({
      username: cuser.username,
      kills: cuser.kills,
      id: cuser.id
    });
  });

  // sort the results list
  tempUsers.sort(compare);

  // draws usernames
  let yPosLoop = 180;
  let placeCount = 1;
  tempUsers.forEach(function(cuser) {
    if (cuser.id === user.id) {
      ctx.fillText(`${placeCount}. ${cuser.username}(you): ${cuser.kills} Kills`, x + width/2, y + yPosLoop);
    } else {
      ctx.fillText(`${placeCount}. ${cuser.username}: ${cuser.kills} Kills`, x + width/2, y + yPosLoop);
    }
    yPosLoop += 30;
    placeCount++;
  });

  ctx.textAlign = "start";
  ctx.fillStyle = "#FC766AFF";
}

// draws help ui
function informationUi(camX, camY) {
  const x = 288 - camX;
  const y = 162 - camY;
  const width = 1024;
  const height = 576;
  ctx.fillStyle = "#272525";
  ctx.globalAlpha = 0.85;
  ctx.fillRect(x, y, width, height);
  ctx.globalAlpha = 1;
  ctx.drawImage(info, x, y);
}

// draw a circle
function drawCircle(x, y, r, start, finish, filled=false) {
  if (filled) {
    ctx.beginPath();
    ctx.arc(x, y, r, start, finish);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(x, y, r, start, finish);
    ctx.stroke();
  }
}

// draw a mini map
function drawMiniMap(mapX, mapY, mapWidth, mapHeight, camX, camY, player, players, obstacles, bgs, fs=false) {
  ctx.globalAlpha = 0.70;
  mapX = mapX - camX;
  mapY = mapY - camY;
  const mapDif = mapSize.width/mapWidth;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#97BC62FF"

  // draws minimap borders
  ctx.strokeRect(mapX, mapY, mapWidth, mapHeight);
  ctx.fillRect(mapX, mapY, mapWidth, mapHeight);

  bgs.forEach(function(bg) {
    ctx.fillStyle = bg.color;
    ctx.triangle(mapX+bg.x1/mapDif, mapY+bg.y1/mapDif, mapX+bg.x2/mapDif, mapY+bg.y2/mapDif, mapX+bg.x3/mapDif, mapY+bg.y3/mapDif).fill();
  });

  // draws player on the minmap
  if (!fs) {
    ctx.fillStyle = player.color;
    // draws player on the minimap
    drawCircle(mapX+((player.pos.x + mapSize.width/2)/mapDif), mapY+((player.pos.y + mapSize.height/2)/mapDif), player.r/mapDif*2, 0, 2*Math.PI, true);
    // draws obstacles on the minimap
    obstacles.forEach(function(obs) {
      if (obs.drawable) {
        ctx.fillStyle = obs.color;
        ctx.roundRect(mapX+((obs.x + player.r)/mapDif)+mapSize.width/mapDif/2, mapY+((obs.y + player.r)/mapDif)+mapSize.height/mapDif/2, (obs.width - player.r*2)/mapDif, (obs.height - player.r*2)/mapDif, 20/mapDif).fill();
      }
    });
    // draws other players on minimap
    players.forEach(function(cplayer) {
      ctx.fillStyle = cplayer.color;
      drawCircle(mapX+((cplayer.pos.x + mapSize.width/2)/mapDif), mapY+((cplayer.pos.y + mapSize.height/2)/mapDif), cplayer.r/mapDif*2, 0, 2*Math.PI, true);
    });
  } else {
    ctx.fillStyle = player.color;
    // draws player on the minimap
    drawCircle(mapX+((player.pos.x + mapSize.width/2)/mapDif), mapY+((player.pos.y + mapSize.height/2)/mapDif), player.r/mapDif, 0, 2*Math.PI, true);
    // draws obstacles on the minimap
    obstacles.forEach(function(obs) {
      if (obs.drawable) {
        ctx.fillStyle = obs.color;
        ctx.roundRect(mapX+(obs.x/mapDif)+mapSize.width/mapDif/2, mapY+(obs.y/mapDif)+mapSize.height/mapDif/2, obs.width/mapDif, obs.height/mapDif, 20/mapDif).fill();
      }
    });
    // draws other players on minimap
    players.forEach(function(cplayer) {
      ctx.fillStyle = cplayer.color;
      drawCircle(mapX+((cplayer.pos.x + mapSize.width/2)/mapDif), mapY+((cplayer.pos.y + mapSize.height/2)/mapDif), cplayer.r/mapDif, 0, 2*Math.PI, true);
    });
  }
  ctx.globalAlpha = 1;
}

// draw the timer
function drawTimer(camX, camY, timeStarted, gameLength, timeIcon) {
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.drawImage(timeIcon, 20 - camX, 20 - camY);
  ctx.fillText(((gameLength*1000 - (performance.now() - timeStarted))/1000).toFixed(2), 110 - camX, 95 - camY);
}