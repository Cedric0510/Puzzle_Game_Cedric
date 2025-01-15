import { Color } from "./Color";
import { Direction } from "./Direction";
import { Point } from "./Point";
import { Shape } from "./Shape";
import { Wall } from "./Wall";
import { Button } from "./Button";

export class Player extends Point {
    constructor(x: number, y: number, color: Color, z_index: number = 3) {
        super(x, y, Shape.CIRCLE, color, z_index);
    }

    public move(direction: Direction, walls: Wall[], buttons: Button[]): void {
        let newX = this.x;
        let newY = this.y;

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
                newY += 1;
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