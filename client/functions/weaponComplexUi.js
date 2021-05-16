// draws bullet count and reload animation
function drawWeaponComplex(reloading, reloadTime, lastReload, bullets,remainingBullets, camX, camY) {
  ctx.font = "40px sans-serif";
  if (!reloading) {
    // draws bullet count
    ctx.fillStyle = "black";
    ctx.fillText(bullets + "/" + remainingBullets, canvas.width - bulletIcon.width - 96 - 30 - camX - 30, canvas.height - 30 - camY);
    // this image has the same margin as the mini map
    ctx.drawImage(bulletIcon, canvas.width - bulletIcon.width - 30 - camX, canvas.height - bulletIcon.height - 30 - camY);
  } else {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "#272525";
    ctx.textAlign = "center";

    // draws reloading text
    ctx.fillText("Reloading...", 1400 - camX, 835 - camY);
    ctx.font = "18px sans-serif";
    // draws realoding animation
    drawCircle(800 - camX, 625 - camY, 40, 0, 2 * Math.PI);
    ctx.lineWidth = 19;
    ctx.strokeStyle = "#F05E23";
    drawCircle(800 - camX, 625 - camY, 28, 1.5 * Math.PI, ((performance.now() - lastReload)/reloadTime*2 - 0.5) * Math.PI);
    ctx.fillStyle = "#272525";
    drawCircle(800 - camX, 625 - camY, 20, 0, 2 * Math.PI, true);
    ctx.fillStyle = "white";
    ctx.fillText((Math.abs(performance.now() - lastReload - reloadTime)/1000).toFixed(2), 800 - camX, 631 - camY)

    ctx.textAlign = "start";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
  }

  // draws the weapons' images on the right side of windows
  ctx.drawImage(player.mainWeapon.img, canvas.width - player.mainWeapon.img.width - 30 - camX, canvas.height - player.mainWeapon.img.height - bulletIcon.height - 30 - camY);
  ctx.drawImage(player.sideWeapon.img, canvas.width - player.sideWeapon.img.width - 30 - camX, canvas.height - player.sideWeapon.img.height - bulletIcon.height - player.mainWeapon.img.height - 30 - camY);
  ctx.drawImage(player.thirdWeapon.img, canvas.width - player.sideWeapon.img.width - 30 - camX, canvas.height - player.sideWeapon.img.height - bulletIcon.height - player.mainWeapon.img.height- player.thirdWeapon.img.height - 30 - camY);

  // these image has the same rightside-margin as the mini map too
  if (player.weapon == player.mainWeapon){
    ctx.drawImage(frame, canvas.width - player.mainWeapon.img.width - 30 - 4 - camX, canvas.height - player.mainWeapon.img.height - bulletIcon.height - 30 - 8 - camY);
    if (performance.now() - lastShot < player.weapon.rateOfFire){
      // Robert nemaini šo uz let vai const jo nestrādās
      var x = canvas.width - player.weapon.img.width - 30 - camX;
      var y = (canvas.height - player.weapon.img.height - bulletIcon.height - 30 - 4 - camY) + (1 - (performance.now() - lastShot) / player.weapon.rateOfFire) * player.weapon.img.height;
    }
  } else if (player.weapon == player.sideWeapon){
    ctx.drawImage(frame, canvas.width - player.sideWeapon.img.width - 30 - 4 - camX, canvas.height - player.sideWeapon.img.height - bulletIcon.height - 8 - player.mainWeapon.img.height - 30 - camY);
    if (performance.now() - lastShot < player.weapon.rateOfFire){
      var x = canvas.width - player.weapon.img.width - 30 - camX;
      var y = (canvas.height - player.sideWeapon.img.height - bulletIcon.height - 4 - player.mainWeapon.img.height - 30 - camY) + (1 - (performance.now() - lastShot) / player.weapon.rateOfFire) * player.weapon.img.height;
      
    }
  } else if (player.weapon == player.thirdWeapon){
    ctx.drawImage(frame, canvas.width - player.sideWeapon.img.width - 30 - 4 - camX, canvas.height - player.sideWeapon.img.height - bulletIcon.height - 8 - player.mainWeapon.img.height - player.thirdWeapon.img.height -  30 - camY);
    if (performance.now() - lastShot < player.weapon.rateOfFire){
      var x = canvas.width - player.weapon.img.width - 30 - camX;
      var y = (canvas.height - player.sideWeapon.img.height - bulletIcon.height - 4 - player.mainWeapon.img.height - player.thirdWeapon.img.height -  30 - camY) + (1 - (performance.now() - lastShot) / player.weapon.rateOfFire) * player.weapon.img.height;
    }
  }
  
  ctx.globalAlpha = 0.30;
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, 96, (performance.now() - lastShot) / player.weapon.rateOfFire * player.weapon.img.height);
  ctx.globalAlpha = 1;
}
