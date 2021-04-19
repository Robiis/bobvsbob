// the player
class client {
  constructor(x, y, color, username) {
    this.x = x;
    this.y = y;
    this.r = 25;
    this.color = color;
    this.username = username;
    this.movement = {
      dir: ""
    }
  }
  draw_body() {
    //Draws the player's body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 8/3;
    ctx.stroke();
    ctx.closePath();
  }
}