import { global } from "./global.js";
import { setupGame } from "./main.js";
import { sound } from "./sound.js";


const screens = {};

screens.startGameScreen = document.getElementById("start-screen");
screens.startGameScreenButton = document.getElementById("start-button");
screens.goToTutorialButton = document.getElementById("gototutorial-button");
screens.soundButton = document.getElementById("sound-button");
screens.gameOverScreen = document.getElementById("gameover-screen");
screens.gameOverScreenButton = document.getElementById("gameover-button");
screens.winScreen = document.getElementById("win-screen");
screens.winScreenButton = document.getElementById("win-button");
screens.tutorialScreen = document.getElementById("tutorial-screen");
screens.tutorialButton = document.getElementById("tutorial-button");

window.addEventListener('load', () => {
    screens.startGameScreen.style.display = "block";
    screens.gameOverScreen.style.display = "none";
    

    screens.soundButton.addEventListener("click", () => {
        sound.switchSound();
    });
    screens.startGameScreenButton.addEventListener("click", () => {
        screens.startGameScreen.style.display = "none";
        setupGame();
        sound.switchSound();
    });
    screens.goToTutorialButton.addEventListener("click", () => {
        screens.startGameScreen.style.display = "none";
        screens.tutorialScreen.style.display = "flex";
        sound.switchSound();
    });
})

screens.displaytutorialScreen = function () {
    if (screens.tutorialScreen.style.display === "flex") {
        return; // Prevent re-showing if already visible
    }
    screens.tutorialScreen.style.display = "flex";
    sound.switchSound();
}

screens.tutorialButton.addEventListener("click", () => {
    screens.tutorialScreen.style.display = "none";
    setupGame();
    sound.switchSound();
});


screens.displayGameOverScreen = function () {
    if (screens.gameOverScreen.style.display === "flex") {
        return; // Prevent re-showing if already visible
    }
    global.gameRunning = false; // Stop the game
    screens.gameOverScreen.style.display = "flex";
    sound.switchSound();
}

screens.gameOverScreenButton.addEventListener("click", () => {
    screens.gameOverScreen.style.display = "none";
    screens.startGameScreen.style.display = "block";
    sound.switchSound();
});

screens.displayWinScreen = function () {
    if (screens.winScreen.style.display === "flex") {
        return; // Prevent re-showing if already visible
    }
    global.gameRunning = false; // Stop the game
    screens.winScreen.style.display = "flex";
    sound.switchSound();
}
screens.winScreenButton.addEventListener("click", function () {
    screens.winScreen.style.display = "none"; // Hide game over screen
    screens.startGameScreen.style.display = "block";
    sound.switchSound();
});

export { screens }