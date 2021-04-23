class obstacle {
  constructor(x, y, drawable, img, imgName, width, height) {
      this.x = x;
      this.y = y;
      this.drawable = drawable;
      if (imgName == "roofBlue"){
        this.width = 150;
        this.height = 150;
        this.img = img;
      } else{
        this.width = width;
        this.height = height
      }
  }

  draw() {
      ctx.drawImage(this.img, this.x, this.y);
  }
}