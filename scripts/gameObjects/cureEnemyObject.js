import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";

class CureEnemyObject extends BaseGameObject {
    active = true;
    name = "CureEnemy";
    speed = 200;
    collided = false;


    update = function () {
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Enemy") {
            collidingObject.active = false;
            this.collided = true;
            setTimeout(() => {
                this.active = false;  
            }, 100);
        }
    }
    constructor(x, y, width, height, facing) {
        super(x, y, width, height);
        this.loadImages(["./assets/images/cure-enemyreal.png"])
        console.log('curererer');
        switch (facing) {
            case 'w':
                this.y = global.playerObject.y - 40
                console.log('w');
                break;
            case 'a':
                this.x = global.playerObject.x - 40
                console.log('a');
                break;
            case 's':
                this.y = global.playerObject.y + global.playerObject.height
                console.log('s');
                break;
            case 'd':
                this.x = global.playerObject.x + global.playerObject.width
                console.log('d');
                break;
        }
    }
}


export { CureEnemyObject }

