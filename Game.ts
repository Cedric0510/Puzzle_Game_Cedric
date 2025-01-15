import { Color } from "./Color";
import { Direction } from "./Direction";
import { Display } from "./Display";
import { Player } from "./Player";
import { Point } from "./Point";
import { Button } from "./Button";
import { Wall } from "./Wall";
import { Door } from "./Door";

console.log("Game.ts loaded");

export class Game {
    private _display: Display;
    private width: number;
    private height: number;
    private level: number;
    private player1: Player;
    private player2: Player;
    private walls: Wall[] = [];
    private buttons: Button[] = [];
    private doors: Door[] = [];
    private _isOver: boolean;

    constructor(canvasId: string, width: number, height: number, scale: number) {
        console.log("Game constructor called");
        this._display = new Display(canvasId, width, height, scale);
        this.width = width;
        this.height = height;
        this.level = 1;
        this._isOver = false;

        this.player1 = new Player(width / 2, height / 2, Color.RED);
        this.player2 = new Player(width / 2 + 1, height / 2, Color.BLUE);

        this.loadLevel(this.level);
        this.setupInput();
    }

    public getLvl(): number {
        return this.level;
    }

    public isWalkable(obj: Point): boolean {
        if (obj instanceof Wall && !obj.can_walk_on()) return false;
        return true;
    }

    private async loadLevel(level: number): Promise<void> {
        console.log(`Loading level ${level}`);
        this.walls = await Wall.fetchWallPositions(level);
        this.buttons = await Button.fetchButtonPositions(level);
        this.doors = await Door.fetchDoorPositions(level);
        console.log("Walls:", this.walls);
        console.log("Buttons:", this.buttons);
        console.log("Doors:", this.doors);
    }

    private setupInput(): void {
        window.addEventListener('keydown', (event) => {
            if (!this._isOver) {
                switch (event.key) {
                    case 'ArrowUp':
                        this.player1.move(Direction.UP, this.walls, this.buttons);
                        break;
                    case 'ArrowDown':
                        this.player1.move(Direction.DOWN, this.walls, this.buttons);
                        break;
                    case 'ArrowLeft':
                        this.player1.move(Direction.LEFT, this.walls, this.buttons);
                        break;
                    case 'ArrowRight':
                        this.player1.move(Direction.RIGHT, this.walls, this.buttons);
                        break;
                    case 'w':
                        this.player2.move(Direction.UP, this.walls, this.buttons);
                        break;
                    case 's':
                        this.player2.move(Direction.DOWN, this.walls, this.buttons);
                        break;
                    case 'a':
                        this.player2.move(Direction.LEFT, this.walls, this.buttons);
                        break;
                    case 'd':
                        this.player2.move(Direction.RIGHT, this.walls, this.buttons);
                        break;
                }
                console.log("Rendering objects");
                this._display.render(this.allObjects);
                if (this.checkWinCondition()) {
                    this._isOver = true;
                    alert('You win!');
                }
            }
        });
    }

    private checkWinCondition(): boolean {
        const goldenButton = this.buttons.find(button => button.getColor() === Color.YELLOW);
        return goldenButton !== undefined && this.player1.isOn(goldenButton) && this.player2.isOn(goldenButton);
    }

    public out_of_bounds(point: Point): boolean {
        return point.getX() < 0 || point.getX() >= this.width || point.getY() < 0 || point.getY() >= this.height;
    }

    public get allObjects(): Point[] {
        const objects: Point[] = [];
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

    public get isOver(): boolean {
        return this._isOver;
    }

    public get display(): Display {
        return this._display;
    }
}