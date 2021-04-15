// get room id from the url
const { room, newroom } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// connect to socket.io
const socket = io();

// send room id req to server
if (newroom !== undefined) {
  socket.emit("new-room-id", newroom);
} else {
  socket.emit("room-id", room);
}

// if user joins a room
socket.on("joined-room", function(data) {
  console.log(`Joined room: ${data.roomId}, admin: ${data.admin}`);
});

// if another user joins the room
socket.on("connect-user", function(id) {
  console.log(`User ${id} connected`);
});

// if a user disconnects from the room
socket.on("disconnect-user", function(id) {
  console.log(`User ${id} disconnected`);
});

// if a message from the server is sent
socket.on("msg", function(msg) { console.log(msg) });

// if an error from the server is sent
socket.on("err", function(err) { console.error(err) });

// if server asks to redirect, redirect
socket.on("redirect", function(destination) {
  window.location.href = destination;
});

// if user is diconnected from the server
socket.on("disconnect", function() {
  console.log("disconnected");
});