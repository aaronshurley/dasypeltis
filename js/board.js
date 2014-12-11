(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  var Board = SNAKE.Board = function (dim) {
    this.dim = dim;

    this.egg = new SNAKE.Egg(this);
    this.snake = new SNAKE.Snake(this);
  };

  Board.BLANK_SYMBOL = ".";

  Board.blankGrid = function (dim) {
    var grid = [];

    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  };

  // text-based render function
  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);

    this.snake.segments.forEach(function (segment) {
      grid[segment.i][segment.j] = Snake.SYMBOL;
    });

    grid[this.egg.position.i][this.egg.position.j] = Egg.SYMBOL;

    var rowStrs = []
    grid.map(function (row) {
      return row.join("");
    }).join("\n");
  };

  Board.prototype.validPosition = function (coord) {
    return (coord.i >= 0) && (coord.i <= 19) && (coord.j >= 0) && (coord.j <= 19);
  };
})();