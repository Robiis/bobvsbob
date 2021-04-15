// send an error to the client and disconnect
function errorHandler(socket, err) {
  socket.emit("err", err)
  socket.disconnect();
}

// send a message to the client
function messageHandler(socket, msg) {
  socket.emit("msg", msg);
}

module.exports = { errorHandler, messageHandler };