function drawInfoScreen(camX, camY, player, players) {
  const x = 288 - camX;
  const y = 162 - camY;
  const width = 1024;
  const height = 576;

  ctx.font = "80px sans-serif";
  ctx.fillStyle = "#272525";
  ctx.globalAlpha = 0.85;

  ctx.fillRect(x, y, width, height);

  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.fillStyle = "white";

  ctx.fillText("LEADERBOARD", x + width/2, y + 130);

  ctx.font = "50px Arial";

  ctx.fillText(`${player.username}: 1 kill`, x + width/2, y + 210);
  let yPosLoop = 290;
  players.forEach(function(cplayer) {
    ctx.fillText(`${cplayer.username}: 1 kill`, x + width/2, y + yPosLoop);
    yPosLoop += 80;
  });

  // ctx.fillText("coolusername1234: 1 kill", x + width/2, y + 210);
  // ctx.fillText("coolusername1234: 1 kill", x + width/2, y + 290);
  // ctx.fillText("coolusername1234: 1 kill", x + width/2, y + 370);
  // ctx.fillText("coolusername1234: 1 kill", x + width/2, y + 450);

  ctx.textAlign = "start";
  ctx.fillStyle = player.color;
}

// draws bullet count and reload animation
function drawBulletReloadUi(reloading, reloadTime, lastReload, bullets, camX, camY, bulletImg) {
  ctx.font = "35px sans-serif";
  if (!reloading) {
    ctx.fillStyle = "black";
    ctx.fillText(bullets, 1400 - camX, 835 - camY);
    ctx.drawImage(bulletImg, 1450 - camX, 800 - camY);
  } else {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "#272525";
    ctx.textAlign = "center";

    ctx.fillText("Reloading...", 1400 - camX, 835 - camY);
    drawCircle(800 - camX, 632 - camY, 73, 0, 2 * Math.PI);
    ctx.lineWidth = 25;
    ctx.strokeStyle = "#F05E23";
    drawCircle(800 - camX, 632 - camY, 57, 1.5 * Math.PI, ((performance.now() - lastReload)/reloadTime*2 - 0.5) * Math.PI);
    ctx.fillStyle = "#272525";
    drawCircle(800 - camX, 632 - camY, 45, 0, 2 * Math.PI, true);
    ctx.fillStyle = "white";
    ctx.fillText((Math.abs(performance.now() - lastReload - reloadTime)/1000).toFixed(2), 800 - camX, 645 - camY)

    ctx.textAlign = "start";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
  }
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