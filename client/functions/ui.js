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