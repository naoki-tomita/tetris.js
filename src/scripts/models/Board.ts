export class Board {
  board: number[][];
  constructor(width: number, height: number) {
    this.board = Array(height)
      .fill(null)
      .map(_ =>
        Array(width)
          .fill(null)
          .map(_ => 0));
  }

  setAt(x: number, y: number, value: number) {
    this.board[x][y] = value;
  }

  getAt(x: number, y: number): number {
    return this.board[x][y];
  }

  forEach(cb: (x: number, y: number, value: number) => void) {
    return this.board.forEach((row, x) => row.forEach((cell, y) => cb(x, y, cell)));
  }
}