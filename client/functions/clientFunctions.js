// copy the text to clipboard
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in the top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn"t work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don"t need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "successful" : "unsuccessful";
    console.log("Copying was " + msg);
  } catch (err) {
    console.log("There was a problem copying");
  }

  document.body.removeChild(textArea);
}

// create a new player username under the "players" in lobby
function createAPlayerUsername(id, username) {
  const userTag = document.createElement("li");
  const userText = document.createTextNode(username);

  userTag.appendChild(userText);
  userTag.id = `id-${id}`;
  document.getElementById("players-list").appendChild(userTag);
}

// remove a new player username under the "players" in lobby
function removeAPlayerUsername(id) {
  document.getElementById("players-list").removeChild(document.getElementById(`id-${id}`));
}

// if an user updates their username
function updatePlayerUsername(id, newUsername) {
  const userTag = document.getElementById(`id-${id}`);
  userTag.innerHTML = newUsername;
  userTag.id = `id-${id}`;
}

// create a new icon for the admin username under the "players" in lobby
function adminPlayerCrown(id, username) {
  const userTag = document.createElement("i");
  const userText = document.createTextNode("");
  const parent = document.getElementById(`id-${id}`);

  parent.innerHTML = username + " "; 
  userTag.appendChild(userText);
  userTag.className = "fas fa-crown crown";
  parent.appendChild(userTag);
}

function clientPlayerSign(id) {
  const parent = document.getElementById(`id-${id}`);
  parent.innerHTML += " (You)";
}

// when the client changes their username
function changeUsername() {
  const input = document.getElementById("username");
  user.username = input.value;
  player.username = input.value;

  socket.emit("change-username", input.value);
  input.placeholder = input.value;
  input.value = "";

  updatePlayerUsername(user.id, user.username);
  if (user.admin) {
    adminPlayerCrown(user.id, user.username);
  } 
  clientPlayerSign(user.id);
}

// if you start a game
function startGame() {
  if (user.admin) {
    socket.emit("start-game");
  }
}

function keyboardInput(keys) {
  socket.emit("keyboard-input", keys);
}

// get user object by id
function getUserById(users, id) {
  return users.find(user => user.id === id);
}