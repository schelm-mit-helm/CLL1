import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Tree extends BaseGameObject {
    name = "Tree";

    constructor(x, y, width, height) {
        super(x, y, width, height), // wiriting super adresses the constructor from the class that we extend from, in this  caseBaseGameOject
        this.loadImages(["./assets/images/tree-final.png"])
    }
}

export {Tree};