import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Walkable } from "./Walkable.js";
import { Color } from "./Color.js";

export class Wall extends Point implements Walkable {

    protected static WALL_Z: number = 2;

    constructor(x: number, y: number, shape: Shape = Shape.RECTANGLE, color: Color = Color.GRAY, z_index: number = Wall.WALL_Z) {
        super(x, y, shape, color, z_index);
    }

    public can_walk_on(): boolean {
        return false;
    }

    public enableWalk() {}

    public disableWalk() {}

    public static async fetchWallPositions(level: number): Promise<Wall[]> {
        try {
            const response = await fetch('./data/wall.json');
            if (!response.ok) {
                console.error('Failed to load wall data:', response.statusText);
                return [];
            }
            const data = await response.json();
            console.log('Wall data loaded:', data[level]);
            return data[level].map((pos: any) => new Wall(pos.x, pos.y));
        } catch (error) {
            console.error('Error fetching wall positions:', error);
            return [];
        }
    }
}