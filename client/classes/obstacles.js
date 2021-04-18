class obstacle {
  constructor(x, y, img, imgName) {
      this.x = x;
      this.y = y;
      this.img = img;
      this.imgName = imgName;
      if (imgName == "roofBlue"){
        this.width = 150;
        this.height = 150;
      }
  }

  draw() {
      ctx.drawImage(this.img, this.x, this.y);
  }
}