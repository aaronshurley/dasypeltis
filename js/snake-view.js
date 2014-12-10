(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  var View = SNAKE.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
    var that = this;
    setInterval(function (){
      that.game.board.snake.move();
      that.render(); 
    }, 1000);
  };
  
  // View.prototype.step = function step (){
  //   this.game.board.snake.move();
  //   this.render();
  // };

  View.prototype.bindEvents = function () {
    var that = this;
    $(document).keydown(function (event) { 
      console.log(event.keyCode);
      switch(event.keyCode) {
        case 38:
          return that.game.board.snake.turn("N");

        case 39:
          return that.game.board.snake.turn("E");

        case 40:
          return that.game.board.snake.turn("S");

        case 37:
          return that.game.board.snake.turn("W");

        default:
          return;
     }
    });
  };
  
  View.prototype.setupBoard = function () {
    var megaString = "";
    for (var i = 0; i < 20; i++) {
      megaString += "<div class='row'>";
      for (var j = 0; j < 20; j++){
        megaString += "<div class='cell' id=" + i.toString() + j.toString() + "></div>";
      }
      megaString += "</div>";
    }
    this.$el.html(megaString);
  };
  
  View.prototype.render = function () {
    var that = this;
    this.game.board.snake.segments.forEach( function (coord) {
      var divId = coord.pos[0].toString() + coord.pos[1].toString();
      
      var $snakeDiv = $('#' + divId); //document.getElementById(divId);
      console.log($snakeDiv);
      $snakeDiv.css("background", "tomato");
    });
  };
})();
