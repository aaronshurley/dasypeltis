(function () {
  if(typeof SNAKE === "undefined") {
    window.SNAKE ={};
  }
  
  var Snake = SNAKE.Snake = function () {
    this.DIR = ["N", "E", "S", "W"];
    this.dir = "N";
    this.segments = [new Coord([10, 10])];
    this.lastPos = null;
  };

  Snake.prototype.move = function move () {
    var that =  this;
    this.segments.forEach(function (coord) {
      coord.plus(that.dir);
    });
  };
  
  Snake.prototype.turn = function turn (dir){
    this.dir = dir;
  };

  var Coord = SNAKE.Coord = function (pos) {
    this.pos = pos;
  };

  Coord.prototype.plus = function (dir) {
    if (dir === "N") {
      this.pos = [this.pos[0]-1, this.pos[1]];
    } else if (dir === "E") {
      this.pos = [this.pos[0], this.pos[1]+1];
    } else if (dir === "S") {
      this.pos = [this.pos[0]+1, this.pos[1]];
    } else {
      this.pos = [this.pos[0], this.pos[1]-1];
    } 
  };

  var Board = SNAKE.Board = function () {
    this.snake = new Snake();
    this.grid = this.makeGrid();
    
  }
  
  Board.prototype.makeGrid = function () {
    var grid = [];
    for (var i = 0; i < 20; i++) {
      grid.push([]);
      for (var j = 0; j < 20; j++) {
        grid[i].push(null);
      }
    }
    return grid;
  };
  
  Board.prototype.render = function () {
    var that = this;
    this.snake.segments.forEach( function (coord) {
       that.grid[coord.pos[0]][coord.pos[1]] = "S";
     });
    
    var strs = [];
    for (var rowIdx = 0; rowIdx < 20; rowIdx++) {
      var marks = [];
      for (var colIdx = 0; colIdx < 20; colIdx++) {
        marks.push(
          this.grid[rowIdx][colIdx] ? "S" : "."
        );
      }

      strs.push(marks.join(" ") + "\n");
    }

    console.log(strs.join("\n"));
    
  };
  
  var Game = SNAKE.Game= function () {
    this.board = new Board();
  }
})();

