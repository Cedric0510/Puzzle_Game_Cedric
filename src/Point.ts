import { Color } from "./Color.js";
import { Shape } from "./Shape.js";

export class Point {
    protected x: number;
    protected y: number;
    protected shape: Shape;
    protected color: Color;
    protected z_index: number;

    constructor(x: number = 0, y: number = 0, shape: Shape = Shape.CIRCLE, color: Color = Color.NONE, z_index: number = 0) {
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.color = color;
        this.z_index = z_index;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setPos(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public getShape(): Shape {
        return this.shape;
    }

    public setShape(shape: Shape): void {
        this.shape = shape;
    }

    public getColor(): Color {
        return this.color;
    }

    public setColor(color: Color): void {
        this.color = color;
    }

    public getZIndex(): number {
        return this.z_index;
    }

    public setZIndex(z_index: number): void {
        this.z_index = z_index;
    }

    public isOn(point: Point): boolean {
        return point != this && point.getX() == this.getX() && point.getY() == this.getY();
    }
}