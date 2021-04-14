// draws the map
function map(size) {
  let p = 0;
  for (let i = 0; i <= 1; i++) {
      for (let j = 0 + p; j < myCanvas.height; j += 2 * size) {
          for (let n = 0 - p; n < myCanvas.width; n += 2 * size) {
              ctx.fillStyle = "#FCE38A";
              ctx.fillRect(n, j, size, size);
          }
          for (let n = size - p; n < myCanvas.width; n += 2 * size) {
              ctx.fillStyle = "#eaffd0";
              ctx.fillRect(n, j, size, size);
          }
      }
      p = size;
  }
  ctx.fillStyle = "#90ee90";
}
