(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }
  
  var Snake = SNAKE.Snake = function (board) {
    this.dir = "N";
    this.board = board;

    var center = new SNAKE.Coord(board.dim / 2, board.dim / 2);
    this.segments = [center];

    this.growTurns = 0;
    this.points = 0;
  };

  Snake.DIFFS = {
    "N": new SNAKE.Coord(-1, 0),
    "E": new SNAKE.Coord(0, 1),
    "S": new SNAKE.Coord(1, 0),
    "W": new SNAKE.Coord(0, -1)
  };

  Snake.SYMBOL = "S";

  Snake.prototype.eatEgg = function () {
    if (this.head().equals(this.board.egg.position)) {
      this.growTurns += 2;
      this.points += 10;
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.isValid = function () {
    var head = this.head();

    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

  Snake.prototype.move = function () {
    // move snake forward
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

    // check if eating an egg
    if (this.eatEgg()) {
      this.board.egg.place();
    }

    // if not growing, remove tail segment
    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    // destroy snake if it eats itself or runs off grid
    if (!this.isValid()) {
      this.segments = [];
    }
  };

  Snake.prototype.turn = function (dir) {
    // avoid turning directly back on yourself
    if ((this.segments.length > 1) &&
      Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir])) {
      return;
    } else {
      this.dir = dir;
    }
  };
})();