import { Board } from "./Board";

export class Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor(selector: string, width: number, height: number) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  render(board: Board) {
    board.forEach((x, y, v) => {
      this.renderBlock(x, y, COLOR[v]);
    });
  }

  renderBlock(x: number, y: number, color: Color) {
    this.context.fillStyle = color.toCanvasColorString();
    this.context.fillRect(x * 10, y * 10, 10, 10);
    this.context.fillStyle = color.getDarkColor().toCanvasColorString();
    this.context.fillRect(x * 10 + 2, y * 10 + 2, 6, 6);
  }
}