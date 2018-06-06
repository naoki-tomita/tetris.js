
export class Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor(selector: string) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  render() {

  }
}