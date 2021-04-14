const { room, username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("room-id", { room: room, username: username });

socket.on("joined-room", function(roomId) {
  console.log("Joined room: " + roomId);
});

socket.on("connect-user", function(username) {
  console.log("Connected user: " + username)
});

socket.on("err", function(err) { console.log(err) });