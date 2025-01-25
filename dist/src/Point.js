import { Color } from "./Color.js";
import { Shape } from "./Shape.js";
export class Point {
    constructor(x = 0, y = 0, shape = Shape.CIRCLE, color = Color.NONE, z_index = 0) {
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.color = color;
        this.z_index = z_index;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    getShape() {
        return this.shape;
    }
    setShape(shape) {
        this.shape = shape;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    getZIndex() {
        return this.z_index;
    }
    setZIndex(z_index) {
        this.z_index = z_index;
    }
    isOn(point) {
        return point != this && point.getX() == this.getX() && point.getY() == this.getY();
    }
}
