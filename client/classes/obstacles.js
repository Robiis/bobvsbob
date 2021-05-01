// class obstacle {
//   constructor(x, y, drawable, img, imgName, width, height) {
//       this.x = x;
//       this.y = y;
//       this.drawable = drawable;
//       if (imgName == "roofBlue"){
//         this.width = 150;
//         this.height = 150;
//         this.img = img;
//       } else{
//         this.width = width;
//         this.height = height
//       }
//       this.lu = [this.x, this.y]; //upper left corner coords
//       this.ru = [this.x + this.width, this.y]; //upper right corner
//       this.ld = [this.x, this.y + this.height]; //bottom left corner
//       this.rd = [this.x + this.width, this.y + this.height]; //bottom right corner
//   }

//   draw() {
//     if (this.drawable){
//       ctx.drawImage(this.img, this.x, this.y);
//     } else{
//       ctx.fillStyle = "yellow";
//       ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
      
//   }
// }

class obstacle {
  constructor(x, y, width, height, color, drawable=true) {
    this.x = x - mapSize.width/2;
    this.y = y - mapSize.height/2;
    this.width = width;
    this.height = height
    this.drawable = drawable;
    this.color = color;
    this.lu = [this.x, this.y]; //upper left corner coords
    this.ru = [this.x + this.width, this.y]; //upper right corner
    this.ld = [this.x, this.y + this.height]; //bottom left corner
    this.rd = [this.x + this.width, this.y + this.height]; //bottom right corner
  }

  draw() {
    if (this.drawable) {
      ctx.fillStyle = this.color;
      ctx.roundRect(this.x, this.y, this.width, this.height, 20).fill();
    }
  }
}