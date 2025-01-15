import { Color } from "./Color";
import { Point } from "./Point";
import { Shape } from "./Shape";
import { Walkable } from "./Walkable";

export class Button extends Point implements Walkable {

    protected static BUTTON_Z: number = 1;
    protected static DESACTIVATED_BUTTON_COLOR: Color = Color.YELLOW;
    protected static ACTIVATED_BUTTON_COLOR: Color = Color.GREEN;

    protected _activated: boolean;

    constructor(x: number, y: number) {
        super(x, y, Shape.RECTANGLE, Button.DESACTIVATED_BUTTON_COLOR, Button.BUTTON_Z);
        this._activated = false;
    }

    public can_walk_on(): boolean {
        return !this._activated;
    }

    public enableWalk(): void {
        this._activated = false;
        this.color = Button.DESACTIVATED_BUTTON_COLOR;
    }

    public disableWalk(): void {
        this._activated = true;
        this.color = Button.ACTIVATED_BUTTON_COLOR;
    }

    public static async fetchButtonPositions(level: number): Promise<Button[]> {
        const response = await fetch(`../data/button.json`);
        const data = await response.json();
        return data[level].map((pos: any) => new Button(pos.x, pos.y));
    }

    public static render(context: CanvasRenderingContext2D, buttons: Button[]): void {
        buttons.forEach(button => {
            context.fillStyle = button.getColor().toString(); 
            context.fillRect(button.getX() * 20, button.getY() * 20, 20, 20); 
        });
    }
}