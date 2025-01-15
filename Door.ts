import { Color } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";
import { Walkable } from "./Walkable";

export class Door extends Point implements Walkable {

    protected static DOOR_Z: number = 2;
    protected _isOpen: boolean;

    constructor(x: number, y: number, color: Color, isOpen: boolean = false, z_index: number = Door.DOOR_Z) {
        super(x, y, Shape.RECTANGLE, color, z_index);
        this._isOpen = isOpen;
    }

    public can_walk_on(): boolean {
        return this._isOpen;
    }

    public enableWalk(): void {
        this._isOpen = true;
    }

    public disableWalk(): void {
        this._isOpen = false;
    }

    public static async fetchDoorPositions(level: number): Promise<Door[]> {
        const response = await fetch(`../data/door.json`);
        const data = await response.json();
        return data[level].map((pos: any) => new Door(pos.x, pos.y, pos.color, pos.isOpen));
    }

    public static render(context: CanvasRenderingContext2D, doors: Door[]): void {
        doors.forEach(door => {
            context.fillStyle = door.getColor().toString(); 
            context.fillRect(door.getX() * 20, door.getY() * 20, 20, 20); 
        });
    }
}