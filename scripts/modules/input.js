import { global } from "./global.js";

function move(event) {
    switch (event.key) {
        case "w":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = -200;
            global.playerObject.switchCurrentSprites(9, 11);
            global.playerObject.facing = 'w';
            break;
        case "a":
            global.playerObject.xVelocity = -200;
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(6, 8);
            global.playerObject.facing = 'a';
            break;
        case "s":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 200;
            global.playerObject.switchCurrentSprites(3, 5);
            global.playerObject.facing = 's';
            break;
        case "d":
            global.playerObject.xVelocity = 200;
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(0, 2);
            global.playerObject.facing = 'd'; 
            break;
        case "e": // for curing the enemy
            // create object in the direction player is facing
            global.playerObject.cureEnemy();
            break;

    }
}

function stop(event) {
    switch (event.key) {
        case "w":
            global.playerObject.yVelocity = 0;
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            break;
        case "s":
            global.playerObject.yVelocity = 0;
            break;
        case "d":
            global.playerObject.xVelocity = 0;
            break;
    }
}

document.addEventListener("keypress", move);
document.addEventListener("keyup", stop);