import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Tree extends BaseGameObject {
    name = "Tree";

    constructor(x, y, width, height) {
        super(x, y, width, height), 
        this.loadImages(["./assets/images/tree-final.png"]) //tree sprites
    }
}

export {Tree};