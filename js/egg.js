(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }
  var Egg = SNAKE.Egg = function (board) {
    this.board = board;
    this.place();
  };

  Egg.prototype.place = function () {
    var placed = false;
    while (!placed) {
      var x = Math.floor(Math.random() * this.board.dim);
      var y = Math.floor(Math.random() * this.board.dim);
      var pos = new SNAKE.Coord(x, y);
    
      if (this.validPos(pos)) {
        this.position = pos;
        placed = true;
      }
    }
  }

  Egg.prototype.validPos = function (pos) {
    var valid = false;
    if (this.board.snake) {
      valid = true;
      this.board.snake.segments.forEach(function (coord) {
        if (coord.equals(pos)){
          valid = false;
        }
      });
    } else { // snake hasn't been created yet
      valid = true;
    }
    return valid;
  }
})();