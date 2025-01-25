import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
export class Door extends Point {
    constructor(x, y, color, isOpen = false, z_index = Door.DOOR_Z) {
        super(x, y, Shape.RECTANGLE, color, z_index);
        this._isOpen = isOpen;
    }
    can_walk_on() {
        return this._isOpen;
    }
    enableWalk() {
        this._isOpen = true;
    }
    disableWalk() {
        this._isOpen = false;
    }
    static async fetchDoorPositions(level) {
        const response = await fetch(`../data/door.json`);
        const data = await response.json();
        return data[level].map((pos) => new Door(pos.x, pos.y, pos.color, pos.isOpen));
    }
    static render(context, doors) {
        doors.forEach(door => {
            context.fillStyle = door.getColor().toString();
            context.fillRect(door.getX() * 20, door.getY() * 20, 20, 20);
        });
    }
    getColor() {
        return this.color;
    }
}
Door.DOOR_Z = 2;
