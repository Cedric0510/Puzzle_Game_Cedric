import { Color } from "./Color.js";
import { Direction } from "./Direction.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Wall } from "./Wall.js";
import { Button } from "./Button.js";

export class Player extends Point {
    constructor(x: number, y: number, color: Color, z_index: number = 3) {
        super(x, y, Shape.CIRCLE, color, z_index);
    }

    public move(direction: Direction, walls: Wall[], buttons: Button[]): void {
        let newX = this.getX();
        let newY = this.getY();

        switch (direction) {
            case Direction.UP:
                newY -= 1;
                break;
            case Direction.DOWN:
                newY += 1;
                break;
            case Direction.LEFT:
                newX -= 1;
                break;
            case Direction.RIGHT:
                newX += 1; // Correction ici
                break;
            default:
                break;
        }

        if (!walls.some(wall => wall.getX() === newX && wall.getY() === newY)) {
            this.setPos(newX, newY);
        }

        buttons.forEach(button => {
            if (this.isOn(button)) {
                button.enableWalk();
            }
        });
    }
}