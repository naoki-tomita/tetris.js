class Color {
  r: number;
  g: number;
  b: number;
  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toCanvasColorString() {
    return `rgb(${this.r},${this.g},${this.b})`;
  }

  getDarkColor() {
    return new Color(this.r / 2, this.g / 2, this.b / 2);
  }
}
