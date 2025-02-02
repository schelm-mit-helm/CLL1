import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { Player } from "./player.js";

class Flower extends BaseGameObject {
    name = "Flower";
    timer = 0;
    getBoxBounds = function () {
        let bounds = {
            //-25 and +25 is there so the candy does not vanish immedately and it look more natural, can be used to increase target/hit space so an object is easier to hit or in this case make it smaller.
            left: this.x + 25,
            right: this.x + this.width - 25,
            top: this.y + 25,
            bottom: this.y + this.height - 25, 
        }
        return bounds;
    };

    reactToCollision = function (collidingObject) {
        switch (collidingObject.name) {
            case "Player":
                this.active = false;
                global.score += 1;// increases score by one
                global.updateScore();
                // console.log (global.score);
                break;
    
        }  
    }

    constructor(x, y, width, height) {
        super(x, y, width, height), // wiriting super adresses the constructor from the class that we extend from, in this  caseBaseGameOject
        this.loadImages(["./assets/images/flower.png"])
    }
} 
export { Flower };