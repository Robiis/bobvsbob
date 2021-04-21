// get room object by id
function getRoomById(rooms, roomId) {
  return rooms.find(room => room.roomId === roomId);
}

// get user object by id
function getUserById(users, id) {
  return users.find(user => user.id === id);
}

module.exports = { getRoomById, getUserById };