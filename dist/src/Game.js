import { Color } from "./Color.js";
import { Direction } from "./Direction.js";
import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Button } from "./Button.js";
import { Wall } from "./Wall.js";
import { Door } from "./Door.js";
console.log("Game.ts loaded");
export class Game {
    constructor(canvasId, width, height, scale) {
        this.walls = [];
        this.buttons = [];
        this.doors = [];
        console.log("Game constructor called");
        this._display = new Display(canvasId, width, height, scale);
        this.width = width;
        this.height = height;
        this.level = 1;
        this._isOver = false;
        this.player1 = new Player(0, 0, Color.RED);
        this.player2 = new Player(0, 0, Color.BLUE);
    }
    async initialize() {
        await this.loadLevel(this.level);
        this.setupInput();
        this.startGameLoop();
    }
    getLvl() {
        return this.level;
    }
    isWalkable(obj) {
        if (obj instanceof Wall && !obj.can_walk_on())
            return false;
        return true;
    }
    mapNumberToColor(num) {
        const colorMap = {
            1: Color.GREEN,
            2: Color.RED,
            3: Color.BLUE,
        };
        return colorMap[num] || Color.GRAY;
    }
    async loadLevel(level) {
        console.log(`Loading level ${level}`);
        try {
            const response = await fetch(`../data/level${level}.json`);
            const data = await response.json();
            // Initialisation des murs
            this.walls = data.Walls.map(coord => new Wall(coord[0], coord[1]));
            // Initialisation des portes avec mappage des couleurs
            this.doors = data.Doors.map(coord => new Door(coord[0], coord[1], this.mapNumberToColor(coord[2])));
            // Initialisation des boutons (PressurePlates)
            this.buttons = data.PressurePlates.map(coord => new Button(coord[0], coord[1]));
            // Initialisation des joueurs
            this.player1.setPos(data.PlayersStart[0][0], data.PlayersStart[0][1]);
            this.player2.setPos(data.PlayersStart[1][0], data.PlayersStart[1][1]);
            console.log("Level loaded successfully");
        }
        catch (error) {
            console.error(`Error loading level ${level}:`, error);
        }
    }
    setupInput() {
        window.addEventListener('keydown', (event) => {
            let direction;
            switch (event.key) {
                case 'ArrowUp':
                    direction = Direction.UP;
                    break;
                case 'ArrowDown':
                    direction = Direction.DOWN;
                    break;
                case 'ArrowLeft':
                    direction = Direction.LEFT;
                    break;
                case 'ArrowRight':
                    direction = Direction.RIGHT;
                    break;
                default:
                    direction = Direction.NONE;
            }
            if (direction !== Direction.NONE) {
                this.player1.move(direction, this.walls, this.buttons);
                this.player2.move(direction, this.walls, this.buttons);
                this.display.draw(this);
                if (this.checkWinCondition()) {
                    this._isOver = true;
                    console.log("You win!");
                }
            }
        });
    }
    checkWinCondition() {
        var _a, _b;
        const endX = (_a = this.levelData) === null || _a === void 0 ? void 0 : _a.EndPlates[0];
        const endY = (_b = this.levelData) === null || _b === void 0 ? void 0 : _b.EndPlates[1];
        return this.player1.getX() === endX && this.player1.getY() === endY &&
            this.player2.getX() === endX && this.player2.getY() === endY;
    }
    startGameLoop() {
        const gameLoop = () => {
            if (!this.isOver) {
                this.display.draw(this);
                requestAnimationFrame(gameLoop);
            }
        };
        gameLoop();
    }
    get allObjects() {
        const objects = [];
        objects.push(...this.walls);
        objects.push(...this.buttons);
        objects.push(...this.doors);
        objects.push(this.player1);
        objects.push(this.player2);
        return objects;
    }
    get isOver() {
        return this._isOver;
    }
    get display() {
        return this._display;
    }
}
