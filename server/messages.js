// send an error to the client and disconnect
function errorHandler(socket, err) {
  socket.emit("err", err)
  socket.disconnect();
}

module.exports = { errorHandler };