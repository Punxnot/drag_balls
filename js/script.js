"use strict";

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let ballColor = "#0095DD";
var gameStarted = false;
var ballsList = [];

function distance(p, q) {
  return Math.sqrt(Math.pow(p[0] - q[0], 2) + Math.pow(p[1] - q[1], 2));
}

class Ball {
  constructor(x, y) {
    this.x = x; // horizontal vector
    this.y = y; // vertical vector
    this.draggable = false;
    this.dx = 2;
    this.dy = -2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  }

  move(e) {
    if (this.draggable) {
      this.x = e.pageX - canvas.offsetLeft;
      this.y = e.pageY - canvas.offsetTop;
    }
  }

  down(e) {
    if ((e.pageX < this.x + 15 + canvas.offsetLeft) && (e.pageX > this.x - 15 + canvas.offsetLeft) && (e.pageY < this.y + 15 + canvas.offsetTop) && (e.pageY > this.y - 15 + canvas.offsetTop)) {
      this.x = e.pageX - canvas.offsetLeft;
      this.y = e.pageY - canvas.offsetTop;
      this.draggable = true;
      var that = this;
      canvas.addEventListener("mousemove", function(e) {
        that.move(e);
      })
    }
  }

  up() {
    this.draggable = false;
    canvas.onmousemove = null;
    gameStarted = true;
  }

  fly() {
    // Move ball
    if (this.x <= canvas.width/2 && gameStarted) {
      this.x += this.dx;
      this.y += this.dy;
    }

    // Bounce off top and bottom walls
    if (this.y + this.dy < ballRadius) {
      this.dy = -this.dy;
    }
    else if (this.y + this.dy > canvas.height - ballRadius) {
      this.dy = -this.dy;
    }

    // Bounce off left and right walls
    if (this.x + this.dx < ballRadius || this.x + this.dx > canvas.width/2 - ballRadius) {
      this.dx = -this.dx;
    }
  }

  getCenter() {
    let x = this.x + ballRadius;
    let y = this.y + ballRadius;
    return [x, y];
  }

  collide(otherBall) {
    if(distance(this.getCenter(), otherBall.getCenter()) <= ballRadius * 2) {
      if (this.dx != otherBall.dx && this.dy != otherBall.dy) {
        this.dx = -this.dx;
        otherBall.dx = -otherBall.dx;
        this.dy = -this.dy;
        otherBall.dy = -otherBall.dy;
      } else if(this.dx != otherBall.dx) {
        this.dx = -this.dx;
        otherBall.dx = -otherBall.dx;
      } else if (this.dy != otherBall.dy) {
        this.dy = -this.dy;
        otherBall.dy = -otherBall.dy;
      }
    }
  }
}

document.addEventListener("mousedown", function(e) {
  e = e || window.event;
  for (let ball of ballsList) {
    ball.down(e);
  }
});
document.addEventListener("mouseup", function(e) {
  e = e || window.event;
  for (let ball of ballsList) {
    ball.up(e);
  }
});

var ball1 = new Ball(450, 50);
var ball2 = new Ball(500, 80);
var ball3 = new Ball(320, 140);
ballsList.push(ball1);
ballsList.push(ball2);
ballsList.push(ball3);

function groupCollide(group, otherObj) {
  let mySet = new Set(group);
  for(let i of mySet) {
    i.collide(otherObj);
  }
}

function getCursorPosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return [x, y];
}

function animateAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //To do: canvas.width/2
  for (let ball of ballsList) {
    let otherBalls = ballsList.slice();
    otherBalls.splice(ballsList.indexOf(ball), 1);
    ball.draw();
    ball.fly();
    groupCollide(otherBalls, ball);
  }
  requestAnimationFrame(animateAll);
}

animateAll();

// Create new balls by double clicking on the canvas
canvas.addEventListener("dblclick", function(e) {
  let xPos = getCursorPosition(canvas, e)[0];
  let yPos = getCursorPosition(canvas, e)[1];
  if (xPos > canvas.width/2) {
    var oneMoreBall = new Ball(xPos, yPos);
    ballsList.push(oneMoreBall);
    let prevE = e;
    setTimeout(function() {
      document.addEventListener("mousedown", function(e) {
        e = e || window.event;
        oneMoreBall.down(e);
      });
    }, 300);
    setTimeout(function() {
      document.addEventListener("mouseup", function(e) {
        e = e || window.event;
        for (let ball of ballsList) {
          oneMoreBall.up(e);
        }
      });
    }, 400);
  }
});
