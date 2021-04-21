// get room object by id
function getRoomById(rooms, roomId) {
  return rooms.find(room => room.roomId === roomId);
}

// get user object by id
function getUserById(users, id) {
  return users.find(user => user.id === id);
}

class obstacle {
  constructor(x, y,imgName) {
      this.x = x;
      this.y = y;
      if (imgName == "roofBlue"){
        this.width = 150;
        this.height = 150;
      }
  }

  draw() {
      ctx.drawImage(this.img, this.x, this.y);
  }
}

module.exports = { getRoomById, getUserById ,obstacle};