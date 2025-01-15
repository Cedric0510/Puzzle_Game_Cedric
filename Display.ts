import { Drawer } from "./Drawer";
import { Game } from "./Game";
import { Point } from "./Point";
import { Shape } from "./Shape";

console.log("Display.ts loaded");

export class Display {

    protected drawer: Drawer;

    constructor(canvasId: string, width: number, height: number, scale: number) {
        console.log("Display constructor called");
        this.drawer = new Drawer(canvasId, scale);
    }

    public draw_objects(obj: Point, curr_z_index: number): boolean {
        if (obj.getZIndex() != curr_z_index) return false;

        switch (obj.getShape()) {
            case Shape.CIRCLE:
                console.log(`Drawing circle at (${obj.getX()}, ${obj.getY()}) with color ${obj.getColor()}`);
                this.drawer.drawCircle(obj.getX(), obj.getY(), obj.getColor());
                break;
            case Shape.RECTANGLE:
                console.log(`Drawing rectangle at (${obj.getX()}, ${obj.getY()}) with color ${obj.getColor()}`);
                this.drawer.drawRectangle(obj.getX(), obj.getY(), obj.getColor());
                break;
            default:
                break;
        }

        return true;
    }

    public draw(game: Game): void {
        this.drawer.clear();

        let z_index: number = 0;
        let objects: Point[] = game.allObjects;
        let left_obj: Point[] = [];

        while (objects.length) {
            for (let obj of objects) {
                if (!this.draw_objects(obj, z_index)) {
                    left_obj.push(obj);
                }
            }

            objects = left_obj;
            left_obj = [];
            z_index++;
        }
    }

    public render(objects: Point[]): void {
        this.drawer.clear();
        objects.forEach(obj => {
            switch (obj.getShape()) {
                case Shape.CIRCLE:
                    console.log(`Rendering circle at (${obj.getX()}, ${obj.getY()}) with color ${obj.getColor()}`);
                    this.drawer.drawCircle(obj.getX(), obj.getY(), obj.getColor());
                    break;
                case Shape.RECTANGLE:
                    console.log(`Rendering rectangle at (${obj.getX()}, ${obj.getY()}) with color ${obj.getColor()}`);
                    this.drawer.drawRectangle(obj.getX(), obj.getY(), obj.getColor());
                    break;
                default:
                    break;
            }
        });
    }
}