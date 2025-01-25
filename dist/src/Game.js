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
        this.player1 = new Player(width / 2, height / 2, Color.RED);
        this.player2 = new Player(width / 2 + 1, height / 2, Color.BLUE);
    }
    async init() {
        console.log("=== Game Initialization Start ===");
        await this.loadLevel(this.level);
        console.log("Loaded objects:", {
            walls: this.walls.length,
            buttons: this.buttons.length,
            doors: this.doors.length
        });
        console.log("Player 1 position:", { x: this.player1.getX(), y: this.player1.getY() });
        console.log("Player 2 position:", { x: this.player2.getX(), y: this.player2.getY() });
        console.log("=== Game Initialization Complete ===");
        this._display.render(this.allObjects);
    }
    getLvl() {
        return this.level;
    }
    isWalkable(obj) {
        if (obj instanceof Wall && !obj.can_walk_on())
            return false;
        if (obj instanceof Door && !obj.can_walk_on())
            return false;
        return true;
    }
    async loadLevel(level) {
        console.log(`Loading level ${level} data...`);
        try {
            const wallsPromise = Wall.fetchWallPositions(level);
            const buttonsPromise = Button.fetchButtonPositions(level);
            const doorsPromise = Door.fetchDoorPositions(level);
            const [walls, buttons, doors] = await Promise.all([
                wallsPromise,
                buttonsPromise,
                doorsPromise
            ]);
            this.walls = walls;
            this.buttons = buttons;
            this.doors = doors;
            console.log("Level data loaded successfully");
        }
        catch (error) {
            console.error("Error loading level:", error);
            throw error;
        }
    }
    setupInput() {
        console.log("Setting up input...");
        window.addEventListener('keydown', (event) => {
            if (!this._isOver) {
                console.log(`Key pressed: ${event.key}`);
                switch (event.key) {
                    case 'ArrowUp':
                        this.player1.move(Direction.UP, this.walls, this.buttons, this.doors);
                        break;
                    case 'ArrowDown':
                        this.player1.move(Direction.DOWN, this.walls, this.buttons, this.doors);
                        break;
                    case 'ArrowLeft':
                        this.player1.move(Direction.LEFT, this.walls, this.buttons, this.doors);
                        break;
                    case 'ArrowRight':
                        this.player1.move(Direction.RIGHT, this.walls, this.buttons, this.doors);
                        break;
                    case 'w':
                        this.player2.move(Direction.UP, this.walls, this.buttons, this.doors);
                        break;
                    case 's':
                        this.player2.move(Direction.DOWN, this.walls, this.buttons, this.doors);
                        break;
                    case 'a':
                        this.player2.move(Direction.LEFT, this.walls, this.buttons, this.doors);
                        break;
                    case 'd':
                        this.player2.move(Direction.RIGHT, this.walls, this.buttons, this.doors);
                        break;
                }
                console.log("Rendering objects after input");
                this._display.render(this.allObjects);
                if (this.checkWinCondition()) {
                    this._isOver = true;
                    alert('You win!');
                }
            }
        });
    }
    checkWinCondition() {
        const goldenButton = this.buttons.find(button => button.getColor() === Color.YELLOW);
        return goldenButton !== undefined && this.player1.isOn(goldenButton) && this.player2.isOn(goldenButton);
    }
    out_of_bounds(point) {
        return point.getX() < 0 || point.getX() >= this.width || point.getY() < 0 || point.getY() >= this.height;
    }
    get allObjects() {
        const objects = [];
        for (const wall of this.walls) {
            objects.push(wall);
        }
        for (const button of this.buttons) {
            objects.push(button);
        }
        for (const door of this.doors) {
            objects.push(door);
        }
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
