function borderCheck(client) {
    obstacles.forEach(function(obs) {
        //Checks if client is out of the borders
        if (client.movement.dir === "r") {
            if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { // LEFT border of obs
                client.pos.x = obs.x - client.r - 1;
            };
        } else if (client.movement.dir === "dr") {
            if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { // LEFT border of obs
                client.pos.x = obs.x - client.r - 1;
            };
            if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { // UPPER border of obs
                client.pos.y = obs.y - client.r - 1;
            };
        } else if (client.movement.dir === "d") {
            if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { // UPPER border of obs
                client.pos.y = obs.y - client.r - 1;
            };
        } else if (client.movement.dir === "dl") {
            if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { // UPPER border of obs
                client.pos.y = obs.y - client.r - 1;
            };
            if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { // RIGHT border of obs
                client.pos.x = obs.x + obs.width + client.r + 1;
            };
        } else if (client.movement.dir === "l") {
            if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { // RIGHT border of obs
                client.pos.x = obs.x + obs.width + client.r + 1;
            };
        } else if (client.movement.dir === "ul") {
            if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { // RIGHT border of obs
                client.pos.x = obs.x + obs.width + client.r + 1;
            };
            if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { // LOWER border of obs
                client.pos.y = obs.y + obs.height + client.r + 1;
            };
        } else if (client.movement.dir === "u") {
            if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { // LOWER border of obs
                client.pos.y = obs.y + obs.height + client.r + 1;
            };
        } else if (client.movement.dir === "ur") {
            if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { // LOWER border of obs
                client.pos.y = obs.y + obs.height + client.r + 1;
            };
            if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { // LEFT border of obs
                client.pos.x = obs.x - client.r - 1;
            };
        };
    });
  }