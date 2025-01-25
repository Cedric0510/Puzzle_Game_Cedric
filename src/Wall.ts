import { Color } from "./Color.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Walkable } from "./Walkable.js";

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
        const response = await fetch(`../data/wall.json`);
        const data = await response.json();
        return data[level].map((pos: any) => new Wall(pos.x, pos.y, Shape.RECTANGLE, Color.GRAY, Wall.WALL_Z));
    }

    public static render(context: CanvasRenderingContext2D, walls: Wall[]): void {
        walls.forEach(wall => {
            context.fillStyle = wall.getColor().toString(); 
            context.fillRect(wall.getX() * 20, wall.getY() * 20, 20, 20); 
        });
    }
}