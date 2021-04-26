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
    };
    this.pos = {
      x: x,
      y: y
    };
    this.font = "30px Arial";
    this.nameColor = "#95E1D3";
    //for shooting
    this.weapon = weapon.ak; // player's weapon
    this.shootYes = false; // if mouse clicked
    this.theta = 0; // the angle between mouse and player
    this.lastMouseX = this.x + 1; // the last mouse x coordinate
    this.lastMouseY = this.y;// the last mouse y coordinate
    this.wWidth = 5;
    this.wLength = 25;
    this.wColor = "black";
    this.shootingDist = 600; // how far can player shoot
  }

  // Draws the player's body
  draw_body() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 16/3;
    ctx.stroke();
    ctx.closePath();
  }

  // Draws the player's name
  draw_name() {
    ctx.font = this.font;
    ctx.fillStyle = this.nameColor;
    let width = ctx.measureText(this.username).width;
    ctx.fillText(this.username, this.pos.x - 1 / 2 * width, this.pos.y - this.r - 10);
  }
  
  // Draws the playes's weapon
  draw_weapon() {
    // calculates the end point coords of weapon(Some Math shit) (how dare you say that) (Ur mom)
    // be careful! You have to add this.r to this.wLength, because wLength is the length outside the player body(the circle)
    this.theta = Math.atan2(this.lastMouseY - this.pos.y, this.lastMouseX - this.pos.x);
    let eX = this.pos.x + Math.cos(this.theta) * (this.wLength + this.r); // eX stands for endpoint X
    let eY = this.pos.y + Math.sin(this.theta) * (this.wLength + this.r);
    //draws the weapon
    ctx.fillStyle = this.wColor;
    ctx.beginPath();
    ctx.lineWidth = this.wWidth;
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(eX, eY);
    ctx.stroke();
    ctx.closePath();
  }
}