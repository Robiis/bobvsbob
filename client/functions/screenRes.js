function screenSize(){
  if (window.innerWidth <= 1200 && myCanvas.width != 800){
    canvasWidth = 800;
    canvasHeight = 450;
  } else if (window.innerWidth <= 1600 && window.innerWidth > 1200 && myCanvas.width != 1200){
    canvasWidth = 1200;
    canvasHeight = 675;
  } else if (window.innerWidth > 1600 && myCanvas.width != 1600){
    canvasWidth = 1600;
    canvasHeight = 900;
  }
}