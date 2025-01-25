import { Color } from "./Color.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
export class Door extends Point {
    constructor(x, y, isOpen = false) {
        super(x, y, Shape.RECTANGLE, Color.BLUE, Door.DOOR_Z);
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
        try {
            const response = await fetch('./data/door.json');
            if (!response.ok) {
                console.error('Failed to load door data:', response.statusText);
                return [];
            }
            const data = await response.json();
            console.log('Door data loaded:', data[level]);
            return data[level].map((pos) => new Door(pos.x, pos.y, pos.isOpen));
        }
        catch (error) {
            console.error('Error fetching door positions:', error);
            return [];
        }
    }
    static render(context, doors) {
        doors.forEach(door => {
            context.fillStyle = door.getColor().toString();
            context.fillRect(door.getX() * 20, door.getY() * 20, 20, 20);
        });
    }
}
Door.DOOR_Z = 2;
