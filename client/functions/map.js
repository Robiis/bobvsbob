// draws the map
// this is not the original function, I changed it a bit so that it fits camera movement
function map(size, canvasMagnificationRatio, src) {
    let ratio = canvasMagnificationRatio - 1;
    for (let i = -(ratio * canvas.width) / size; i < (ratio * canvas.width) / size; i++){
        for (let j = -(ratio * canvas.height) / size; j < (ratio * canvas.height) / size; j++){
            ctx.drawImage(src, i * size , j * size);
        }
    }
}