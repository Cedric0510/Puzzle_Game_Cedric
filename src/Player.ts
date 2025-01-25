import { Color } from "./Color.js";
import { Direction } from "./Direction.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Wall } from "./Wall.js";
import { Button } from "./Button.js";
import { Door } from "./Door.js";

export class Player extends Point {
    constructor(x: number, y: number, color: Color, z_index: number = 3) {
        super(x, y, Shape.CIRCLE, color, z_index);
    }

    public move(direction: Direction, walls: Wall[], buttons: Button[], doors: Door[]): void {
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
                newX += 1; 
                break;
        }

        console.log(`Attempting to move to (${newX}, ${newY})`);

        if (!walls.some(wall => wall.getX() === newX && wall.getY() === newY) &&
            !doors.some(door => door.getX() === newX && door.getY() === newY && !door.can_walk_on())) {
            this.setPos(newX, newY);
            console.log(`Moved to (${newX}, ${newY})`);
        } else {
            console.log(`Movement blocked at (${newX}, ${newY})`);
        }

        buttons.forEach(button => {
            if (this.isOn(button)) {
                button.enableWalk();
                console.log(`Button at (${button.getX()}, ${button.getY()}) activated`);
            }
        });
    }
}