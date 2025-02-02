import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Enemy extends BaseGameObject {
    name = "Enemy";
    xVelocity = 0;
    yVelocity = -200;

    randomMovementData = {
       "timeToChangeDirection": 6,
       "currentDirectionElapsedTime": 0,
       "movementChangePossibilityStartValue": 0.1,
       "movementChangePossibility": 0.1,
       "movementChangePossibilitySteps": 0.02,
       "movementChangeOppositePossibility": 0.3
    };

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.3,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 1,
        "currentSpriteIndex": 0
    };

    update = function () {
        this.randomMovementData.currentDirectionElapsedTime += global.deltaTime;

        if (this.randomMovementData.currentDirectionElapsedTime >= this.randomMovementData.timeToChangeDirection) {
            this.randomizeMovement();
            this.randomMovementData.currentDirectionElapsedTime = 0;
        }

        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
    }

    randomizeMovement() {
        const shouldChange = Math.random();
        if (shouldChange > this.randomMovementData.movementChangePossibility) {
            this.changeMovement();
            this.randomMovementData.movementChangePossibility = this.randomMovementData.movementChangePossibilityStartValue;
        } else {
            this.randomMovementData.movementChangePossibility += this.randomMovementData.movementChangePossibilitySteps;
        }
    }

    changeMovement() {
        const shouldGoOpposite = Math.random();
        if (shouldGoOpposite < this.randomMovementData.movementChangeOppositePossibility) {
            this.xVelocity *= -1;
            this.yVelocity *= -1;
        } else {
            const makePositive = Math.random();
            if (this.xVelocity !== 0) {
                this.yVelocity = 150 * (makePositive > 0.5 ? 1 : -1);
                this.xVelocity = 0;
            } else if (this.yVelocity !== 0) {
                this.xVelocity = 150 * (makePositive > 0.5 ? 1 : -1);
                this.yVelocity = 0;
            }
        }
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Tree") {
            // console.log(collidingObject);
            this.x = this.previousX - 0.01 * this.xVelocity;
            this.y = this.previousY - 0.01 * this.yVelocity;
            const originalProbability = this.randomMovementData.movementChangeOppositePossibility;
            this.randomMovementData.movementChangeOppositePossibility = 0;
            this.changeMovement();
            this.randomMovementData.movementChangeOppositePossibility = originalProbability;
        }
    }



    constructor(x, y, width, height, name) {
        super (x, y, width, height, name);
        let images = ["./assets/images/enemy1.png", "./assets/images/enemy2.png"];
        this.loadImages(images);
    }
}

export {Enemy}