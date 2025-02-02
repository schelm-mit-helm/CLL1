import { screens } from "./screens.js";

const global = {};

// function to reset the game variables
global.resetGlobals = function () {
    global.deltaTime = 0;
    global.allGameObjects = [];
    global.playerObject = {};
    global.score = 0;
    global.gameRunning = false;
}

// setting up the canvas
global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.ctx.imageSmoothingEnabled = false;
global.prevTotalRunningTime = 0;


global.getCanvasBounds = function () {
    let bounds = {
        "left": 0,
        "right": this.canvas.width,
        "top": 0,
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }

    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom &&
            box1.left <= box2.right &&
            box1.bottom >= box2.top &&
            box1.right >= box2.left) {
            return true;
        }
    }
    return false;
}

global.updateScore = function () { 
    // Find the score element
    const scoreElement = document.getElementById('score'); 
    // Update its content 
    scoreElement.textContent = `Score: ${global.score}/5`;
    // Check if the score is 5, if it is, display the win screen
    if(global.score >= 5){
        screens.displayWinScreen(); 
    }
}


export { global }