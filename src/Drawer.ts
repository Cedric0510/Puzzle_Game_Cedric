import { Color } from "./Color.js";

console.log("Drawer.ts loaded");

export class Drawer {
    private ctx: CanvasRenderingContext2D;
    private scale: number;

    constructor(canvasId: string, scale: number = 10) {
        console.log("Drawer constructor called");
        this.scale = scale;
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error(`Canvas element with id '${canvasId}' not found`);
        }
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        console.log(`Canvas initialized with id '${canvasId}'`);
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    public drawRectangle(x: number, y: number, color: Color, size = 1): void {
        console.log(`Drawing rectangle at (${x}, ${y}) with color ${color}`);
        this.ctx.fillStyle = color; 
        const width = size * this.scale;
        this.ctx.fillRect(
            x * this.scale + ((this.scale - width) / 2),
            y * this.scale + ((this.scale - width) / 2),
            width,
            width
        );
    }

    public drawCircle(x: number, y: number, color: Color, size = 1): void {
        console.log(`Drawing circle at (${x}, ${y}) with color ${color}`);
        this.ctx.beginPath();
        this.ctx.fillStyle = color; // Maintenant, `color` est une chaîne valide
        this.ctx.arc(
            x * this.scale + this.scale / 2,
            y * this.scale + this.scale / 2,
            (size * this.scale) / 2,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }
}