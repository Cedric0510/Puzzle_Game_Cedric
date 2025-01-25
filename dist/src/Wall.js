import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
import { Color } from "./Color.js";
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
        try {
            const response = await fetch('./data/wall.json');
            if (!response.ok) {
                console.error('Failed to load wall data:', response.statusText);
                return [];
            }
            const data = await response.json();
            console.log('Wall data loaded:', data[level]);
            return data[level].map((pos) => new Wall(pos.x, pos.y));
        }
        catch (error) {
            console.error('Error fetching wall positions:', error);
            return [];
        }
    }
}
Wall.WALL_Z = 2;
