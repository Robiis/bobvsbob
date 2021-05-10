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

// obstacles check between players
function clientObsCheck(client){
    // if the client is the player
    if (client.id === player.id){
        players.forEach(function(enemy){
            //Checks if client collides with all other players
            if (Math.sqrt((client.pos.x - enemy.pos.x) ** 2 + (client.pos.y - enemy.pos.y) ** 2) < client.r + enemy.r){
                client.pos.x = client.lastPos.x;
                client.pos.y = client.lastPos.y
                enemy.pos.x = enemy.lastPos.x;
                enemy.pos.y = enemy.lastPos.y
            }
        })
    } 
    // if the client is other player
    else if (client.id !== player.id){
        players.forEach(function(enemy){
            // checks collision between all other players from "players" array that is not the client himself
            if (Math.sqrt((client.pos.x - enemy.pos.x) ** 2 + (client.pos.y - enemy.pos.y) ** 2) < client.r + enemy.r && enemy.id !== client.id){
                client.pos.x = client.lastPos.x;
                client.pos.y = client.lastPos.y
                enemy.pos.x = enemy.lastPos.x;
                enemy.pos.y = enemy.lastPos.y
            }
        })
    }
}