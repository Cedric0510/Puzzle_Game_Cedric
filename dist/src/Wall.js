import { Color } from "./Color.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
export class Wall extends Point {
    constructor(x, y, shape = Shape.RECTANGLE, color = Color.GRAY, z_index = Wall.WALL_Z) {
        super(x, y, shape, color, z_index);
    }
    can_walk_on() {
        return false;
    }
    enableWalk() { }
    disableWalk() { }
    static async fetchWallPositions(level) {
        const response = await fetch(`../data/wall.json`);
        const data = await response.json();
        return data[level].map((pos) => new Wall(pos.x, pos.y, Shape.RECTANGLE, Color.GRAY, Wall.WALL_Z));
    }
    static render(context, walls) {
        walls.forEach(wall => {
            context.fillStyle = wall.getColor().toString();
            context.fillRect(wall.getX() * 20, wall.getY() * 20, 20, 20);
        });
    }
}
Wall.WALL_Z = 2;
