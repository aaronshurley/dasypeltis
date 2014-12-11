(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  var View = SNAKE.View = function ($el) {
    this.$el = $el;

    this.board = new SNAKE.Board(20);
    this.intervalSet = false;
    this.intervalId = null;
    this.toggleInterval();
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 75;

  View.prototype.handleKeyEvent = function (event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    } else if (event.keyCode === 32) {
      this.toggleInterval();
    }
  };
  
  View.prototype.toggleInterval = function () {
    if (this.intervalSet) {
      window.clearInterval(this.intervalId);
      this.intervalSet = false;
    } else {
      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.STEP_MILLIS
      );
      this.intervalSet = true;
    }
  }

  View.prototype.render = function () {
    var view = this;
    var board = view.board;

    var cellsMatrix = buildCellsMatrix();
    board.snake.segments.forEach(function (seg) {
      cellsMatrix[seg.i][seg.j].addClass("snake");
    });

    cellsMatrix[board.egg.position.i][board.egg.position.j].addClass("egg");

    this.$el.empty();
    this.$el.append("<h3>Your Score: " + board.snake.points + "</h3>");
    this.$el.append("<h5>Use arrow keys to change direction, SPACE to PAUSE game</h5>");
    cellsMatrix.forEach(function (row) {
      var $rowEl = $('<div class="row"></div>');
      row.forEach(function ($cell) { $rowEl.append($cell) });
      view.$el.append($rowEl);
    });

    function buildCellsMatrix () {
      var cellsMatrix = [];
      for (var i = 0; i < board.dim; i++) {
        var cellsRow = [];
        for (var j = 0; j < board.dim; j++) {
          cellsRow.push($('<div class="cell"></div>'));
        }
        cellsMatrix.push(cellsRow);
      }

      return cellsMatrix;
    }
  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      window.clearInterval(this.intervalId);
      var content = "<h2>Game Over</h2><h3>Final Score: " + this.board.snake.points + "</h3><section class='color-1'><a href='#' onclick='location.reload(true); return false;'>Play Again?</a></section><h5><strong>Tip: </strong>Use SPACEBAR to pause the game</h5>";
      $('.container').empty();
      $('.container').append(content);
    }
  };
})();