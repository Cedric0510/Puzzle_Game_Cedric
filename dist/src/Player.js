import { Direction } from "./Direction.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
export class Player extends Point {
    constructor(x, y, color, z_index = 3) {
        super(x, y, Shape.CIRCLE, color, z_index);
    }
    move(direction, walls, buttons) {
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
