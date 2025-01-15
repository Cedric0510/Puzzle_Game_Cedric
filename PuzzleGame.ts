import { Game } from "./Game.js";

console.log("PuzzleGame.ts loaded");

document.addEventListener('DOMContentLoaded', () => {
    const width = 20; 
    const height = 20; 
    const scale = 20; 

    const game = new Game('gameCanvas', width, height, scale);

    function gameLoop() {
        if (!game.isOver) {
            console.log("Game loop running");
            game.display.draw(game);
            requestAnimationFrame(gameLoop);
        }
    }

    gameLoop();
});