class obstacle {
  constructor(x, y, img, imgName, drawable) {
      this.x = x;
      this.y = y;
      this.drawable = drawable;
      if (imgName == "roofBlue"){
        this.width = 150;
        this.height = 150;
        this.img = img;
      } else{
        //basically, there are four obstacles that correspond to the four borders of the game
        //we don't need to draw them, so they don't have img and imgName, instead, they have
        //their width(as img) and height(as imgName)
        this.width = img;
        this.height = imgName
      }
  }

  draw() {
      ctx.drawImage(this.img, this.x, this.y);
  }
}