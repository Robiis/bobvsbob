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
    this.lastPos = {
      x: x,
      y: y
    }
    
    this.shoot = {
      shoot: false,
      fromX: 0,
      fromY: 0,
      toX: 0,
      toY: 0
    }
    this.font = "20px Arial";
    this.nameColor = "black";
    // for shooting
    this.mainWeapon = weapon.ak; // player's main weapon
    this.sideWeapon = weapon.glock // player's pistal
    this.weapon = this.mainWeapon;
    this.shootYes = false; // if mouse clicked
    this.theta = 0; // the angle between mouse and player
    this.lastMouseX = this.pos.x + 1; // the last mouse x coordinate
    this.lastMouseY = this.pos.y;// the last mouse y coordinate
    //this.wWidth = 5;
    //this.wLength = 25;
    //this.wColor = "black";
    //this.shootingDist = 600; // how far can player shoot
    this.scope = false; // if scope is on
    // health
    this.health = 100; // current health
    this.maxHealth = 100;// max health
    this.healthBarH = 8;// health bar height
    this.onCooldown = false; // player spawn cooldown
  }

  // Draws the player's body
  draw_body() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
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
    const width = ctx.measureText(this.username).width;
    ctx.fillText(this.username, this.pos.x - 1 / 2 * width, this.pos.y - this.r - 18);
  }
  
  // Draws the playes's weapon
  draw_weapon() {
    // calculates the end point coords of weapon
    // be careful! You have to add this.r to this.weapon.wLength, because weapon.wLength is the length outside the player body(the circle)
    this.theta = Math.atan2(this.lastMouseY - this.pos.y, this.lastMouseX - this.pos.x);
    let eX = this.pos.x + Math.cos(this.theta) * (this.weapon.wLength + this.r); // eX stands for endpoint X
    let eY = this.pos.y + Math.sin(this.theta) * (this.weapon.wLength + this.r);
    //draws the weapon
    ctx.strokeStyle = this.weapon.wColor;
    ctx.beginPath();
    ctx.lineWidth = this.weapon.wWidth;
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(eX, eY);
    ctx.stroke();
    ctx.closePath();
  }

  // Draws the health bar
  draw_health() {
    //the base, represents the max health
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x - this.r, this.pos.y - this.r - this.healthBarH - 5, 2 * this.r, this.healthBarH);
    //the base, represents the current health
    ctx.fillStyle = "#4cbb17";
    ctx.fillRect(this.pos.x - this.r, this.pos.y - this.r - this.healthBarH - 5, (2 * this.r) * (this.health / this.maxHealth), this.healthBarH);
  }
}