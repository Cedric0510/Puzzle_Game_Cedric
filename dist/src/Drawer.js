console.log("Drawer.ts loaded");
export class Drawer {
    constructor(canvasId, scale = 20) {
        console.log("Drawer constructor called with canvasId:", canvasId);
        this.scale = scale;
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas element with id '${canvasId}' not found`);
            throw new Error(`Canvas element with id '${canvasId}' not found`);
        }
        this.ctx = canvas.getContext('2d');
        if (!this.ctx) {
            console.error(`Failed to get 2D context from canvas with id '${canvasId}'`);
            throw new Error(`Failed to get 2D context from canvas with id '${canvasId}'`);
        }
        console.log(`Canvas initialized with id '${canvasId}'`);
    }
    clear() {
        console.log("Clearing canvas");
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    drawRectangle(x, y, color, size = 1) {
        console.log(`Drawing rectangle at (${x}, ${y}) with color ${color}`);
        this.ctx.beginPath();
        this.ctx.fillStyle = color.toString();
        const width = size * this.scale;
        this.ctx.fillRect(x * this.scale + ((this.scale - width) / 2), y * this.scale + ((this.scale - width) / 2), width, width);
    }
    drawCircle(x, y, color, size = 1) {
        console.log(`Drawing circle at (${x}, ${y}) with color ${color}`);
        this.ctx.beginPath();
        this.ctx.fillStyle = color.toString();
        this.ctx.arc(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2, (size * this.scale) / 2, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}
