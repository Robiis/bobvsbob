// the player
class client {
  constructor(id, x, y, color, username) {
    this.id = id;
    this.r = 25;
    this.color = color;
    this.username = username;
    this.movement = {
      prevDir: "",
      dir: ""
    }
    this.pos = {
      x: x,
      y: y
    }
  }
  draw_body() {
    //Draws the player's body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 16/3;
    ctx.stroke();
    ctx.closePath();
  }
}