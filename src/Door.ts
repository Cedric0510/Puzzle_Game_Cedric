import { Color } from "./Color.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Walkable } from "./Walkable.js";

export class Door extends Point implements Walkable {

    protected static DOOR_Z: number = 2;
    protected _isOpen: boolean;

    constructor(x: number, y: number, isOpen: boolean = false) {
        super(x, y, Shape.RECTANGLE, Color.BLUE, Door.DOOR_Z);
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
        try {
            const response = await fetch('./data/door.json');
            if (!response.ok) {
                console.error('Failed to load door data:', response.statusText);
                return [];
            }
            const data = await response.json();
            console.log('Door data loaded:', data[level]);
            return data[level].map((pos: any) => new Door(pos.x, pos.y, pos.isOpen));
        } catch (error) {
            console.error('Error fetching door positions:', error);
            return [];
        }
    }

    public static render(context: CanvasRenderingContext2D, doors: Door[]): void {
        doors.forEach(door => {
            context.fillStyle = door.getColor().toString(); 
            context.fillRect(door.getX() * 20, door.getY() * 20, 20, 20); 
        });
    }
}