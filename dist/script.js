"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballColor = "#0095DD";
var gameStarted = false;
var ballsList = [];

function distance(p, q) {
  return Math.sqrt(Math.pow(p[0] - q[0], 2) + Math.pow(p[1] - q[1], 2));
}

var Ball = function () {
  function Ball(x, y) {
    _classCallCheck(this, Ball);

    this.x = x; // horizontal vector
    this.y = y; // vertical vector
    this.draggable = false;
    this.dx = 2;
    this.dy = -2;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = ballColor;
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "move",
    value: function move(e) {
      if (this.draggable) {
        this.x = e.pageX - canvas.offsetLeft;
        this.y = e.pageY - canvas.offsetTop;
      }
    }
  }, {
    key: "down",
    value: function down(e) {
      if (e.pageX < this.x + 15 + canvas.offsetLeft && e.pageX > this.x - 15 + canvas.offsetLeft && e.pageY < this.y + 15 + canvas.offsetTop && e.pageY > this.y - 15 + canvas.offsetTop) {
        this.x = e.pageX - canvas.offsetLeft;
        this.y = e.pageY - canvas.offsetTop;
        this.draggable = true;
        var that = this;
        canvas.addEventListener("mousemove", function (e) {
          that.move(e);
        });
      }
    }
  }, {
    key: "up",
    value: function up() {
      this.draggable = false;
      canvas.onmousemove = null;
      gameStarted = true;
    }
  }, {
    key: "fly",
    value: function fly() {
      // Move ball
      if (this.x <= canvas.width / 2 && gameStarted) {
        this.x += this.dx;
        this.y += this.dy;
      }

      // Bounce off top and bottom walls
      if (this.y + this.dy < ballRadius) {
        this.dy = -this.dy;
      } else if (this.y + this.dy > canvas.height - ballRadius) {
        this.dy = -this.dy;
      }

      // Bounce off left and right walls
      if (this.x + this.dx < ballRadius || this.x + this.dx > canvas.width / 2 - ballRadius) {
        this.dx = -this.dx;
      }
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      var x = this.x + ballRadius;
      var y = this.y + ballRadius;
      return [x, y];
    }
  }, {
    key: "collide",
    value: function collide(otherBall) {
      if (distance(this.getCenter(), otherBall.getCenter()) <= ballRadius * 2) {
        if (this.dx != otherBall.dx && this.dy != otherBall.dy) {
          this.dx = -this.dx;
          otherBall.dx = -otherBall.dx;
          this.dy = -this.dy;
          otherBall.dy = -otherBall.dy;
        } else if (this.dx != otherBall.dx) {
          this.dx = -this.dx;
          otherBall.dx = -otherBall.dx;
        } else if (this.dy != otherBall.dy) {
          this.dy = -this.dy;
          otherBall.dy = -otherBall.dy;
        }
      }
    }
  }]);

  return Ball;
}();

document.addEventListener("mousedown", function (e) {
  e = e || window.event;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ballsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ball = _step.value;

      ball.down(e);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
});
document.addEventListener("mouseup", function (e) {
  e = e || window.event;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = ballsList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var ball = _step2.value;

      ball.up(e);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
});

var ball1 = new Ball(450, 50);
var ball2 = new Ball(500, 80);
var ball3 = new Ball(320, 140);
ballsList.push(ball1);
ballsList.push(ball2);
ballsList.push(ball3);

function groupCollide(group, otherObj) {
  var mySet = new Set(group);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = mySet[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var i = _step3.value;

      i.collide(otherObj);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function getCursorPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return [x, y];
}

function animateAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //To do: canvas.width/2
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = ballsList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var ball = _step4.value;

      var otherBalls = ballsList.slice();
      otherBalls.splice(ballsList.indexOf(ball), 1);
      ball.draw();
      ball.fly();
      groupCollide(otherBalls, ball);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  requestAnimationFrame(animateAll);
}

animateAll();

// Create new balls by double clicking on the canvas
canvas.addEventListener("dblclick", function (e) {
  var xPos = getCursorPosition(canvas, e)[0];
  var yPos = getCursorPosition(canvas, e)[1];
  if (xPos > canvas.width / 2) {
    var oneMoreBall = new Ball(xPos, yPos);
    ballsList.push(oneMoreBall);
    var prevE = e;
    setTimeout(function () {
      document.addEventListener("mousedown", function (e) {
        e = e || window.event;
        oneMoreBall.down(e);
      });
    }, 300);
    setTimeout(function () {
      document.addEventListener("mouseup", function (e) {
        e = e || window.event;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = ballsList[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var ball = _step5.value;

            oneMoreBall.up(e);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      });
    }, 400);
  }
});