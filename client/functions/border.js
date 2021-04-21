function borderCheck(user) {
  obstacles.forEach(function(obs) {
      //Checks if user is out of the borders
      if (user.movement.dir === "r") {
          if (user.pos.x + user.r >= obs.x && user.pos.y + user.r >= obs.y && user.pos.y - user.r <= obs.y + obs.height && user.pos.x <= obs.x) { //Checks if user is next to the LEFT border of obs
              user.pos.x = obs.x - user.r - 1;
              rightPressed = false;
              player.movement.dir = "";
          };
      } else if (user.movement.dir === "dr") {
          if (user.pos.x + user.r >= obs.x && user.pos.y + user.r >= obs.y && user.pos.y - user.r <= obs.y + obs.height && user.pos.x <= obs.x) { //Checks if user is next to the LEFT border of obs
              user.pos.x = obs.x - user.r - 1;
              rightPressed = false;
              player.movement.dir = "";
          };
          if (user.pos.y + user.r >= obs.y && user.pos.x + user.r >= obs.x && user.pos.x - user.r <= obs.x + obs.width && user.pos.y <= obs.y) { //Checks if user is next to the UPPER border of obs
              user.pos.y = obs.y - user.r - 1;
              downPressed = false;
              player.movement.dir = "";
          };
      } else if (user.movement.dir === "d") {
          if (user.pos.y + user.r >= obs.y && user.pos.x + user.r >= obs.x && user.pos.x - user.r <= obs.x + obs.width && user.pos.y <= obs.y) { //Checks if user is next to the UPPER border of obs
              user.pos.y = obs.y - user.r - 1;
              downPressed = false;
              player.movement.dir = "";
          };
      } else if (user.movement.dir === "dl") {
          if (user.pos.y + user.r >= obs.y && user.pos.x + user.r >= obs.x && user.pos.x - user.r <= obs.x + obs.width && user.pos.y <= obs.y) { //Checks if user is next to the UPPER border of obs
              user.pos.y = obs.y - user.r - 1;
              downPressed = false;
              player.movement.dir = "";
          };
          if (user.pos.x - user.r <= obs.x + obs.width && user.pos.y + user.r >= obs.y && user.pos.y - user.r <= obs.y + obs.height && user.pos.x >= obs.x + obs.width) { //Checks if user is next to the RIGHT border of obs
              user.pos.x = obs.x + obs.width + user.r + 1;
              leftPressed = false;
              player.movement.dir = "";
          };
      } else if (user.movement.dir === "l") {
          if (user.pos.x - user.r <= obs.x + obs.width && user.pos.y + user.r >= obs.y && user.pos.y - user.r <= obs.y + obs.height && user.pos.x >= obs.x + obs.width) { //Checks if user is next to the RIGHT border of obs
              user.pos.x = obs.x + obs.width + user.r + 1;
              leftPressed = false;
              player.movement.dir = "";
          };
      } else if (user.movement.dir === "ul") {
          if (user.pos.x - user.r <= obs.x + obs.width && user.pos.y + user.r >= obs.y && user.pos.y - user.r <= obs.y + obs.height && user.pos.x >= obs.x + obs.width) { //Checks if user is next to the RIGHT border of obs
              user.pos.x = obs.x + obs.width + user.r + 1;
              leftPressed = false;
              player.movement.dir = "";
          };
          if (user.pos.y - user.r <= obs.y + obs.height && user.pos.x + user.r >= obs.x && user.pos.x - user.r <= obs.x + obs.width && user.pos.y >= obs.y + obs.height) { //Checks if user is next to the LOWER border of obs
              user.pos.y = obs.y + obs.height + user.r + 1;
              upPressed = false;
              player.movement.dir = "";
          };
      } else if (user.movement.dir === "u") {
          if (user.pos.y - user.r <= obs.y + obs.height && user.pos.x + user.r >= obs.x && user.pos.x - user.r <= obs.x + obs.width && user.pos.y >= obs.y + obs.height) { //Checks if user is next to the LOWER border of obs
              user.pos.y = obs.y + obs.height + user.r + 1;
              upPressed = false;
              player.movement.dir = "";
          };
      } else if (user.movement.dir === "ur") {
          if (user.pos.y - user.r <= obs.y + obs.height && user.pos.x + user.r >= obs.x && user.pos.x - user.r <= obs.x + obs.width && user.pos.y >= obs.y + obs.height) { //Checks if user is next to the LOWER border of obs
              user.pos.y = obs.y + obs.height + user.r + 1;
              upPressed = false;
              player.movement.dir = "";
          };
          if (user.pos.x + user.r >= obs.x && user.pos.y + user.r >= obs.y && user.pos.y - user.r <= obs.y + obs.height && user.pos.x <= obs.x) { //Checks if user is next to the LEFT border of obs
              user.pos.x = obs.x - user.r - 1;
              rightPressed = false;
              player.movement.dir = "";
          };
      };
  });
}