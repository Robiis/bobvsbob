function borderCheck(client) {
  obstacles.forEach(function(obs) {
      //Checks if client is out of the borders
      if (client.movement.dir === "r") {
          if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { //Checks if client is next to the LEFT border of obs
              client.pos.x = obs.x - client.r - 1;
              rightPressed = false;
              player.movement.dir = "";
          };
      } else if (client.movement.dir === "dr") {
          if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { //Checks if client is next to the LEFT border of obs
              client.pos.x = obs.x - client.r - 1;
              rightPressed = false;
              player.movement.dir = "";
          };
          if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { //Checks if client is next to the UPPER border of obs
              client.pos.y = obs.y - client.r - 1;
              downPressed = false;
              player.movement.dir = "";
          };
      } else if (client.movement.dir === "d") {
          if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { //Checks if client is next to the UPPER border of obs
              client.pos.y = obs.y - client.r - 1;
              downPressed = false;
              player.movement.dir = "";
          };
      } else if (client.movement.dir === "dl") {
          if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { //Checks if client is next to the UPPER border of obs
              client.pos.y = obs.y - client.r - 1;
              downPressed = false;
              player.movement.dir = "";
          };
          if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { //Checks if client is next to the RIGHT border of obs
              client.pos.x = obs.x + obs.width + client.r + 1;
              leftPressed = false;
              player.movement.dir = "";
          };
      } else if (client.movement.dir === "l") {
          if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { //Checks if client is next to the RIGHT border of obs
              client.pos.x = obs.x + obs.width + client.r + 1;
              leftPressed = false;
              player.movement.dir = "";
          };
      } else if (client.movement.dir === "ul") {
          if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { //Checks if client is next to the RIGHT border of obs
              client.pos.x = obs.x + obs.width + client.r + 1;
              leftPressed = false;
              player.movement.dir = "";
          };
          if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { //Checks if client is next to the LOWER border of obs
              client.pos.y = obs.y + obs.height + client.r + 1;
              upPressed = false;
              player.movement.dir = "";
          };
      } else if (client.movement.dir === "u") {
          if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { //Checks if client is next to the LOWER border of obs
              client.pos.y = obs.y + obs.height + client.r + 1;
              upPressed = false;
              player.movement.dir = "";
          };
      } else if (client.movement.dir === "ur") {
          if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { //Checks if client is next to the LOWER border of obs
              client.pos.y = obs.y + obs.height + client.r + 1;
              upPressed = false;
              player.movement.dir = "";
          };
          if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { //Checks if client is next to the LEFT border of obs
              client.pos.x = obs.x - client.r - 1;
              rightPressed = false;
              player.movement.dir = "";
          };
      };
  });
}