import { Color } from "./Color.js";
import { Direction } from "./Direction.js";
import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Point } from "./Point.js";
import { Button } from "./Button.js";
import { Wall } from "./Wall.js";
import { Door } from "./Door.js";

console.log("Game.ts loaded");

interface LevelData {
    Size: [number, number];
    Walls: number[][];
    Doors: number[][];
    PressurePlates: number[][];
    EndPlates: number[];
    PlayersStart: number[][];
}

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

        this.player1 = new Player(0, 0, Color.RED);
        this.player2 = new Player(0, 0, Color.BLUE);
    }

    public async initialize(): Promise<void> {
        await this.loadLevel(this.level);
        this.setupInput();
        this.startGameLoop();
    }

    public getLvl(): number {
        return this.level;
    }

    public isWalkable(obj: Point): boolean {
        if (obj instanceof Wall && !obj.can_walk_on()) return false;
        return true;
    }

    private mapNumberToColor(num: number): Color {
        const colorMap: { [key: number]: Color } = {
            1: Color.GREEN,
            2: Color.RED,
            3: Color.BLUE,
        };
        return colorMap[num] || Color.GRAY; 
    }

    private async loadLevel(level: number): Promise<void> {
        console.log(`Loading level ${level}`);
        try {
            const response = await fetch(`../data/level${level}.json`);
            const data: LevelData = await response.json();

            // Initialisation des murs
            this.walls = data.Walls.map(coord => new Wall(coord[0], coord[1]));

            // Initialisation des portes avec mappage des couleurs
            this.doors = data.Doors.map(coord => 
                new Door(coord[0], coord[1], this.mapNumberToColor(coord[2]))
            );

            // Initialisation des boutons (PressurePlates)
            this.buttons = data.PressurePlates.map(coord => new Button(coord[0], coord[1]));

            // Initialisation des joueurs
            this.player1.setPos(data.PlayersStart[0][0], data.PlayersStart[0][1]);
            this.player2.setPos(data.PlayersStart[1][0], data.PlayersStart[1][1]);

            console.log("Level loaded successfully");
        } catch (error) {
            console.error(`Error loading level ${level}:`, error);
        }
    }

    private setupInput(): void {
        window.addEventListener('keydown', (event) => {
            let direction: Direction;

            switch(event.key) {
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

            if(direction !== Direction.NONE){
                this.player1.move(direction, this.walls, this.buttons);
                this.player2.move(direction, this.walls, this.buttons);
                this.display.draw(this);

                if(this.checkWinCondition()){
                    this._isOver = true;
                    console.log("You win!");
                }
            }
        });
    }

    private checkWinCondition(): boolean {
        const endX = this.levelData?.EndPlates[0];
        const endY = this.levelData?.EndPlates[1];
        return this.player1.getX() === endX && this.player1.getY() === endY &&
               this.player2.getX() === endX && this.player2.getY() === endY;
    }

    private startGameLoop(): void {
        const gameLoop = () => {
            if (!this.isOver) {
                this.display.draw(this);
                requestAnimationFrame(gameLoop);
            }
        };
        gameLoop();
    }

    public get allObjects(): Point[] {
        const objects: Point[] = [];
        objects.push(...this.walls);
        objects.push(...this.buttons);
        objects.push(...this.doors);
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

    private levelData?: LevelData;
}