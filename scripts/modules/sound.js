import { global } from "./global.js";
import { screens } from "./screens.js";

const sound = {};
sound.soundOn = true; // shows if sound is on or not

sound.startMusic = new Audio("./assets/sounds/menue.mp3");
sound.levelMusic = new Audio("./assets/sounds/level.music.mp3"); 
sound.gameoverMusic = new Audio("./assets/sounds/lost.mp3");
sound.winMusic = new Audio("./assets/sounds/win.mp3");
sound.tutorialMusic = new Audio("./assets/sounds/tutorial.mp3");

// function to turn all sounds on/off

sound.switchSound = function () {

    if(screens.startGameScreen.style.display === "block") {
    sound.startMusic.play();
    } else if (global.gameRunning) {
        sound.tutorialMusic.pause();
    sound.startMusic.pause();
    sound.levelMusic.play();
    sound.levelMusic.currentTime = 0; 
    sound.levelMusic.loop = true;
    } else if (screens.gameOverScreen.style.display === "flex") {
    sound.levelMusic.pause();
    sound.gameoverMusic.play();
    } else if (screens.winScreen.style.display === "flex") {
    sound.levelMusic.pause();
    sound.winMusic.play();
    } else if (screens.tutorialScreen.style.display === "flex") {
    sound.startMusic.pause();
    sound.tutorialMusic.play();
    }

};

export { sound }