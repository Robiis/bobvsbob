// draws the map
// this is not the original function, I changed it a bit so that it fits camera movement
function map(size, canvasMagnificationRatio) {
  let p = 0;
  let ratio = canvasMagnificationRatio - 1;
  for (let i = 0; i <= 1; i++) {
      for (let j = 0 + p - ratio * canvas.height; j <  ratio * canvas.height; j += 2 * size) {
          for (let n = 0 - p - ratio * canvas.width; n < ratio * canvas.width; n += 2 * size) {
              ctx.fillStyle = "#FCE38A";
              ctx.fillRect(n, j, size, size);
          }
          for (let n = size - p - ratio * canvas.width; n < ratio * canvas.width; n += 2 * size) {
              ctx.fillStyle = "#eaffd0";
              ctx.fillRect(n, j, size, size);
          }
      }
      p = size;
  }
  ctx.fillStyle = "#90ee90";
}
