function borderCheck(client) {
    obstacles.forEach(function(obs) {
        //Checks if client is out of the borders
        if (client.movement.dir === "r") {
            if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { // LEFT border of obs
                //client.pos.x = obs.x - client.r - 1;
                client.pos.x = client.lastPos.x;
            };
        } else if (client.movement.dir === "dr") {
            if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { // LEFT border of obs
                //client.pos.x = obs.x - client.r - 1;
                client.pos.x = client.lastPos.x;
            };
            if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { // UPPER border of obs
                //client.pos.y = obs.y - client.r - 1;
                client.pos.y = client.lastPos.y
            };
        } else if (client.movement.dir === "d") {
            if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { // UPPER border of obs
                //client.pos.y = obs.y - client.r - 1;
                client.pos.y = client.lastPos.y
            };
        } else if (client.movement.dir === "dl") {
            if (client.pos.y + client.r >= obs.y && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y <= obs.y) { // UPPER border of obs
                //client.pos.y = obs.y - client.r - 1;
                client.pos.y = client.lastPos.y
            };
            if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { // RIGHT border of obs
                //client.pos.x = obs.x + obs.width + client.r + 1;
                client.pos.x = client.lastPos.x;
            };
        } else if (client.movement.dir === "l") {
            if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { // RIGHT border of obs
                //client.pos.x = obs.x + obs.width + client.r + 1;
                client.pos.x = client.lastPos.x;
            };
        } else if (client.movement.dir === "ul") {
            if (client.pos.x - client.r <= obs.x + obs.width && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x >= obs.x + obs.width) { // RIGHT border of obs
                //client.pos.x = obs.x + obs.width + client.r + 1;
                client.pos.x = client.lastPos.x;
            };
            if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { // LOWER border of obs
                //client.pos.y = obs.y + obs.height + client.r + 1;
                client.pos.y = client.lastPos.y
            };
        } else if (client.movement.dir === "u") {
            if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { // LOWER border of obs
                //client.pos.y = obs.y + obs.height + client.r + 1;
                client.pos.y = client.lastPos.y
            };
        } else if (client.movement.dir === "ur") {
            if (client.pos.y - client.r <= obs.y + obs.height && client.pos.x + client.r >= obs.x && client.pos.x - client.r <= obs.x + obs.width && client.pos.y >= obs.y + obs.height) { // LOWER border of obs
                //client.pos.y = obs.y + obs.height + client.r + 1;
                client.pos.y = client.lastPos.y
            };
            if (client.pos.x + client.r >= obs.x && client.pos.y + client.r >= obs.y && client.pos.y - client.r <= obs.y + obs.height && client.pos.x <= obs.x) { // LEFT border of obs
                //client.pos.x = obs.x - client.r - 1;
                client.pos.x = client.lastPos.x;
            };
        };
    });
}
function clientCheck(client){
    players.forEach(function(enemy){
        //Checks if client collides with other players
        if (Math.sqrt((client.pos.x - enemy.pos.x) ** 2 + (client.pos.y - enemy.pos.y) ** 2) < client.r + enemy.r){
            client.pos.x = client.lastPos.x;
            client.pos.y = client.lastPos.y
            enemy.pos.x = enemy.lastPos.x;
            enemy.pos.y = enemy.lastPos.y
            //client.movement.dir = "";
        }
    })
        //Checks if client collides with other players
        /*if (client.movement.dir === "r") {
            if (client.pos.x + client.r >= enemy.pos.x && client.pos.y + client.r >= enemy.pos.y && client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x <= enemy.pos.x) { // LEFT border of obs
                client.pos.x = enemy.pos.x - client.r - 1;
            };
        } else if (client.movement.dir === "dr") {
            if (client.pos.x + client.r >= enemy.pos.x && client.pos.y + client.r >= enemy.pos.y && client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x <= enemy.pos.x) { // LEFT border of obs
                client.pos.x = enemy.pos.x - client.r - 1;
            };
            if (client.pos.y + client.r >= enemy.pos.y && client.pos.x + client.r >= enemy.pos.x && client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y <= enemy.pos.y) { // UPPER border of obs
                client.pos.y = enemy.pos.y - client.r - 1;
            };
        } else if (client.movement.dir === "d") {
            if (client.pos.y + client.r >= enemy.pos.y && client.pos.x + client.r >= enemy.pos.x && client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y <= enemy.pos.y) { // UPPER border of obs
                client.pos.y = enemy.pos.y - client.r - 1;
            };
        } else if (client.movement.dir === "dl") {
            if (client.pos.y + client.r >= enemy.pos.y && client.pos.x + client.r >= enemy.pos.x && client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y <= enemy.pos.y) { // UPPER border of obs
                client.pos.y = enemy.pos.y - client.r - 1;
            };
            if (client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y + client.r >= enemy.pos.y && client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x >= enemy.pos.x + enemy.r) { // RIGHT border of obs
                client.pos.x = enemy.pos.x + enemy.r + client.r + 1;
            };
        } else if (client.movement.dir === "l") {
            if (client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y + client.r >= enemy.pos.y && client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x >= enemy.pos.x + enemy.r) { // RIGHT border of obs
                client.pos.x = enemy.pos.x + enemy.r + client.r + 1;
            };
        } else if (client.movement.dir === "ul") {
            if (client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y + client.r >= enemy.pos.y && client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x >= enemy.pos.x + enemy.r) { // RIGHT border of obs
                client.pos.x = enemy.pos.x + enemy.r + client.r + 1;
            };
            if (client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x + client.r >= enemy.pos.x && client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y >= enemy.pos.y + enemy.r) { // LOWER border of obs
                client.pos.y = enemy.pos.y + enemy.r + client.r + 1;
            };
        } else if (client.movement.dir === "u") {
            if (client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x + client.r >= enemy.pos.x && client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y >= enemy.pos.y + enemy.r) { // LOWER border of obs
                client.pos.y = enemy.pos.y + enemy.r + client.r + 1;
            };
        } else if (client.movement.dir === "ur") {
            if (client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x + client.r >= enemy.pos.x && client.pos.x - client.r <= enemy.pos.x + enemy.r && client.pos.y >= enemy.pos.y + enemy.r) { // LOWER border of obs
                client.pos.y = enemy.pos.y + enemy.r + client.r + 1;
            };
            if (client.pos.x + client.r >= enemy.pos.x && client.pos.y + client.r >= enemy.pos.y && client.pos.y - client.r <= enemy.pos.y + enemy.r && client.pos.x <= enemy.pos.x) { // LEFT border of obs
                client.pos.x = enemy.pos.x - client.r - 1;
            };
        };*/
}