import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { CureEnemyObject } from "./cureEnemyObject.js";
import { screens } from "../modules/screens.js";

class Player extends BaseGameObject {
    active = true;
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    facing = '';
    invincibility = 1;
    cantakedamage = 0;
    health = 3;



    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };


    update = function () { // Updates the game's state on every frame
        this.x += this.xVelocity * global.deltaTime; // Adjust x and y position based on velocity and time elapsed since last frame ( == deltaTime)
        this.y += this.yVelocity * global.deltaTime;
        this.cantakedamage -= 1 * global.deltaTime;
    }

    reactToCollision = function (collidingObject) {
        switch (collidingObject.name) {
            case "Tree":
                this.xVelocity = 0;
                this.yVelocity = 0;
                this.x = this.previousX;
                this.y = this.previousY;
                this.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
                break;
            case "Flower":
                console.log("Collided with candy");
                break;
            case "Enemy":
                this.determineDamage(1);
                this.updateHealth();
                break;
        }
    }
    updateHealth = function () {
        // Find the score element
        const healthElement = document.getElementById('healthbar');
    
        if (this.health == 3) {
            healthElement.src = "./assets/images/health_3lve.png"; 
        }
        else if (this.health == 2) {
            healthElement.src = "./assets/images/health_2lve.png"; 
        }
        else if (this.health == 1) {
            healthElement.src = "./assets/images/health_1lve.png";
        }
        else if (this.health == 0) {
           global.gameRunning = false;
           screens.displayGameOverScreen();
        }

    }
    determineDamage = function (damage) {
        if (this.cantakedamage <= 0) {
            this.health -= damage;
            this.cantakedamage = this.invincibility;
        }
    }

    cureEnemy = function () {
        let cureEnemy = new CureEnemyObject(this.x, this.y, 40, 40, this.facing);
        global.allGameObjects.push(CureEnemyObject);
        setTimeout(() => {
            if (!cureEnemy.collided) {
                cureEnemy.active = false;
            }
        }, 100);
    }

    constructor(x, y, width, height) {
        super(x, y, width, height), 
            this.loadImagesFromSpritesheet("./assets/images/spritesheet_wizard.png", 3, 4);
    }
}
export { Player } 