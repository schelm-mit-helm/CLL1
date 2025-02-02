import { global } from "../modules/global.js";

class BaseGameObject {
    active = true;
    name;
    x = 100;
    y = 500;
    previousX = 0;
    previousY = 0;
    width = 50;
    height = 50;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    storePositionOfPreviousFrame = function () {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    update = function () {

    };

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;
        // if the time elapsed is greater than the time per sprite, we switch to the next sprite
        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            // if the current sprite index is greater than the last sprite index, we reset it to the first sprite index
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };

    loadImages = function (imageSources) {
       for (let i = 0; i < imageSources.length; i++) {
           /* first load images from path */
           let image = new Image();
           image.src = imageSources [i];
   
           /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
           this.animationData.animationSprites.push(image);

       }
    };
    loadImagesFromSpritesheet(spritesheetPath, cols, rows) {
        // Calculate the number of rows and columns in the spritesheet
        const totalSprites = cols * rows;
        // Pre-create an array with `Image` objects for all sprites
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());

        // Load the spritesheet
        const spritesheet = new Image();
        spritesheet.src = spritesheetPath;
    
        // Add a "load" event listener to the spritesheet
        spritesheet.addEventListener("load", () => {
            const spritesheetWidth = spritesheet.width;
            const spritesheetHeight = spritesheet.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);


            // Create a temporary canvas to extract sprites from the spritesheet
            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;

            // Loop through each sprite's row and column position
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                
                    // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        spritesheet,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );
    
                    // assign it to the corresponding Image object
                    const index = row * cols + col;
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    
    }

    reactToCollision = function (collidingObject) {
        
    }

    objectMovementTimer = function () {

    }
     
    switchCurrentSprites = function(firstSpriteIndex, lastSpriteIndex){
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        

    }

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.previousX = x;
        this.previousY = y;
        
        global.allGameObjects.push(this);
    }

}


export{ BaseGameObject }