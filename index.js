ctx = document.getElementById("canvas").getContext('2d');

class Board {
  constructor(initialBlocks) {
    this.setData(initialBlocks);
  }
  setData(data) {
    this.data = data;
    this.size = {
      y: data.length,
      x: data[0].length,
    };
  }
  forEach(cb) {
    this.data.forEach((row, y) => {
      row.forEach((item, x) => {
        cb(x, y, item);
      });
    });
  }
  rotate() {
    const newData = Array(this.size.x).fill(null).map(() => []);
    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        newData[i][this.size.y - j - 1] = this.data[j][i];
      }
    }
    this.setData(newData);
  }
  set(x, y, value) {
    if (y < 0 || x < 0) {
      throw Error(`Out of range error. x: ${x}, y: ${y}`);
    }
    if (this.size.y <= y || this.size.x <= x) {
      throw Error(`Out of range error. x: ${x}, y: ${y}`);
    }
    this.data[y][x] = value;
  }
  get(x, y) {
    return this.data[y][x];
  }
  clear() {
    this.forEach((x, y) => {
      set(x, y, 0);
    });
  }
}



class Blocks extends Board {
  constructor(initialBlocks, x, y) {
    super(initialBlocks);
    this.x = x;
    this.y = y;
  }
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

const game = {
  KEYCODE: {
    37: "LEFT",
    38: "UP",
    39: "RIGHT",
    40: "DOWN",
    32: "SPACE",
  },
  currentKey: null,
  init: function() {
    document.addEventListener("keydown", (event) => {
      this.currentKey = event.keyCode;
    });
  },
  key: function() {
    const k = this.KEYCODE[this.currentKey];
    this.currentKey = null;
    return k;
  },
  draw: function(board, block) {
    // draw board.
    // draw block if exist.
    function drawBlock(x, y, color) {
      drawOuter(x, y, color);
      drawInner(x, y, color);
    }    
    function drawOuter(x, y, color) {
      if (!color) {
        console.log(color);
      }
      ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
      ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
    function drawInner(x, y, color) {
      ctx.fillStyle = `rgb(${Math.floor(color.r/2)},${Math.floor(color.g/2)},${Math.floor(color.b/2)})`;
      ctx.fillRect((x * BLOCK_SIZE) + BORDER_WIDTH, (y * BLOCK_SIZE) + BORDER_WIDTH, INNER_WIDTH, INNER_WIDTH);
    }

    board.forEach((x, y, v) => {
      drawBlock(x, y, color.def[v]);
    });
    block && block.forEach((x, y, v) => {
      if (v) {
        drawBlock(x + block.x, y + block.y, color.def[v]);
      }
    });
  },
  merge: function(board, block) {
    // merge block to board.
    block.forEach((x, y, v) => {
      if (v) {
        board.set(block.x + x, block.y + y, v);
      }
    });
  },
  isValid: function(board, block) {
    let valid = true;
    // check board and block is margeable.
    block.forEach((x, y, v) => {
      const realX = block.x + x;
      const realY = block.y + y;
      if (board.size.y <= realY || board.size.x <= realX || realX < 0 || realY < 0) {
        valid = false;
      } else if (board.get(block.x + x, block.y +  y) && v) {
        valid = false;
      }
    });
    return valid;
  },
  loop: function(cb, interval) {
    setTimeout(() => {
      cb();
      if (!loopBreak) {
        this.loop(cb, interval);
      }
    }, interval);
  },
  move: function(board, block, direction) {
    switch(direction) {
      case "LEFT":
        block.move(-1, 0);
        if (!this.isValid(board, block)) {
          block.move(1, 0);
        }
        break;
      case "RIGHT":
        block.move(1, 0);
        if (!this.isValid(board, block)) {
          block.move(-1, 0);
        }
        break;
      case "DOWN":
        block.move(0, 1);
        if (!this.isValid(board, block)) {
          block.move(0, -1);
        }
        break;
      case "UP":
        while(this.isValid(board, block)) {
          block.move(0, 1);
        }
        block.move(0, -1);
        break;
      case "SPACE":
        block.rotate();
        break;
      default:
        break;
    }
  },
  createBlock: function() {
    return new Blocks(BLOCK_DEF[Math.floor(Math.random() * BLOCK_DEF.length)], 3, 0);
  }
}

const color = {
  def: [
    { r: 512, g: 512, b: 512 },// white
    { r: 0, g: 0, b: 0 },      // black
    { r: 255, g: 0, b: 0 },    // red
    { r: 0, g: 255, b: 0 },    // green
    { r: 0, g: 0, b: 255 },    // blue
    { r: 255, g: 255, b: 0 },  // yellow
    { r: 255, g: 20, b: 147 }, // pink
    { r: 255, g: 99, b: 71 },  // orange
    { r: 0, g: 255, b: 255 },  // cyan
  ],
  red:    () => this.def[2],
  green:  () => this.def[3],
  blue:   () => this.def[4],
  yellow: () => this.def[5],
  pink:   () => this.def[6],
  orange: () => this.def[7],
  white:  () => this.def[0],
  black:  () => this.def[1],
};

const BLOCK_DEF = [
  [
    [2, 2, 2, 2],
  ],
  [
    [0, 3, 0],
    [3, 3, 3],
  ],
  [
    [4, 0, 0],
    [4, 4, 4],
  ],
  [
    [0, 0, 5],
    [5, 5, 5],
  ],
  [
    [6, 6, 0],
    [0, 6, 6],
  ],
  [
    [0, 7, 7],
    [7, 7, 0],
  ],
  [
    [8, 8],
    [8, 8],
  ],
];

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20
const BLOCK_SIZE = 40;
const BORDER_WIDTH = 4;
const INNER_WIDTH = BLOCK_SIZE - (BORDER_WIDTH * 2);
let loopBreak = false;

function main() {
  game.init();
  const board = new Board(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
  let block = game.createBlock();

  // simple game loop
  game.loop(() => {
    const key = game.key();
    game.move(board, block, key);
    game.draw(board, block);
  }, 1000/60);

  // gravity loop
  game.loop(() => {
    block.move(0, 1);
    if (!game.isValid(board, block)) {
      block.move(0, -1);
      game.merge(board, block);
      block = game.createBlock();
    }
  }, 750);
}

main();