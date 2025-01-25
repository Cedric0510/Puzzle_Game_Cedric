import { Drawer } from "./Drawer.js";
import { Shape } from "./Shape.js";
console.log("Display.ts loaded");
export class Display {
    constructor(canvasId, width, height, scale) {
        console.log("Display constructor called");
        this.drawer = new Drawer(canvasId, scale);
    }
    draw_objects(obj, curr_z_index) {
        if (obj.getZIndex() != curr_z_index)
            return false;
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
    draw(game) {
        this.drawer.clear();
        let z_index = 0;
        let objects = game.allObjects;
        let left_obj = [];
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
    render(objects) {
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
