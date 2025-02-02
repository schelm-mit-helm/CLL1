import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { Tree } from "../gameObjects/tree.js";
import { Flower } from "../gameObjects/flower.js";
import { Enemy } from "../gameObjects/enemy.js";
import { sound } from "./sound.js";


function gameLoop(totalRunningTime) {
    if (!global.gameRunning) return;
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    if (global.gameRunning) {
        global.updateScore()
        for (var i = 0; i < global.allGameObjects.length; i++) {
            if (global.allGameObjects[i].active == true) {
                global.allGameObjects[i].storePositionOfPreviousFrame();
                global.allGameObjects[i].update();
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                global.allGameObjects[i].draw();
                global.allGameObjects[i].objectMovementTimer();
            }
        }
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.resetGlobals();
    global.gameRunning = true;
    global.prevTotalRunningTime	= performance.now();

    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 3, 2, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    for (let i = 0; i < map.length; i++) {
        let innerArray = map[i];
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] == 1) {
                new Tree(j * 50, i * 50, 50, 50)
            }
            else if (innerArray[j] == 2) {
                new Flower(j * 50, i * 50, 50, 50);
            }
            else if (innerArray[j] == 3) {
                new Enemy(j * 50, i * 50, 50, 50);
            }
        }
    }

    global.playerObject = new Player(100, 100, 40, 40);
    global.playerObject.updateHealth();

    requestAnimationFrame(gameLoop);
}




export { setupGame }

