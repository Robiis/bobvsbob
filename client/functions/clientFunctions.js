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
  input.value = input.value.replace(/\s/g, '');
  if (input.value !== "" && input.value.length < 16 && input.value.length > 0) {
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
  } else {
    input.placeholder = user.username;
    input.value = "";
  }
}

// if you start a game
function startGame() {
  if (user.admin) {
    socket.emit("start-game");
  }
}

// send shooting data to server
function shootSend(fromX, fromY, toX, toY) {
  socket.emit("shoot", { fromX, fromY, toX, toY });
}

// send shooting and hit data to server
function shootSendHit(fromX, fromY, toX, toY, hitId, damage) {
  socket.emit("shoot-hit", { fromX, fromY, toX, toY, hitId, damage });
}

// draws a rounded rectangle
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y, x+w, y+h, r);
  this.arcTo(x+w, y+h, x, y+h, r);
  this.arcTo(x, y+h, x, y, r);
  this.arcTo(x, y, x+w, y, r);
  this.closePath();
  return this;
}

// draws a triangle
CanvasRenderingContext2D.prototype.triangle = function(x1, y1, x2, y2, x3, y3) {
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.lineTo(x3, y3);
  this.closePath();
  return this;
}

// create the results screen
function createResultsScreen(users, user) {
  const parent = document.getElementById("results-list");
  parent.innerHTML = "";

  // create the results list
  const results = [];
  results.push({
    kills: user.kills,
    username: user.username,
    damage: user.damage,
    id: user.id
  });
  users.forEach(function(cuser) {
    results.push({
      kills: cuser.kills,
      username: cuser.username,
      damage: cuser.damage,
      id: cuser.id
    });
  });

  // sort the results list
  results.sort(compare);

  // create the results text 
  let resultCount = 1;
  results.forEach(function(result) {
    const resultTag = document.createElement("li");
    let resultText = "";

    if (result.id !== user.id) {
      resultText = document.createTextNode(`${resultCount}. ${result.username}: ${result.kills} Kills, ${result.damage} Damage dealt`);
    } else {
      resultText = document.createTextNode(`${resultCount}. ${result.username}(you): ${result.kills} Kills, ${result.damage} Damage dealt`);
    }

    resultTag.appendChild(resultText);
    parent.appendChild(resultTag);

    resultCount++;
  }); 

}

// get user object by id
function getUserById(users, id) {
  return users.find(user => user.id === id);
}

// compare function for sorting the kills in a list
function compare(a, b) {
  if (a.kills > b.kills) {
    return -1;
  }
  if (a.kills < b.kills) {
    return 1;
  }
  return 0;
}