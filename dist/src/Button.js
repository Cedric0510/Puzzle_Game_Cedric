import { Color } from "./Color.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
export class Button extends Point {
    constructor(x, y) {
        super(x, y, Shape.RECTANGLE, Button.DESACTIVATED_BUTTON_COLOR, Button.BUTTON_Z);
        this._activated = false;
    }
    can_walk_on() {
        return !this._activated;
    }
    enableWalk() {
        this._activated = false;
        this.color = Button.DESACTIVATED_BUTTON_COLOR;
    }
    disableWalk() {
        this._activated = true;
        this.color = Button.ACTIVATED_BUTTON_COLOR;
    }
    static async fetchButtonPositions(level) {
        const response = await fetch(`../data/button.json`);
        const data = await response.json();
        return data[level].map((pos) => new Button(pos.x, pos.y));
    }
    static render(context, buttons) {
        buttons.forEach(button => {
            context.fillStyle = button.getColor().toString();
            context.fillRect(button.getX() * 20, button.getY() * 20, 20, 20);
        });
    }
}
Button.BUTTON_Z = 1;
Button.DESACTIVATED_BUTTON_COLOR = Color.YELLOW;
Button.ACTIVATED_BUTTON_COLOR = Color.GREEN;
