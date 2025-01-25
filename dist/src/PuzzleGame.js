import { Game } from "./Game.js";
console.log("PuzzleGame.ts loaded");
document.addEventListener('DOMContentLoaded', async () => {
    const width = 15;
    const height = 15;
    const scale = 40;
    const game = new Game('gameCanvas', width, height, scale);
    await game.initialize();
});
