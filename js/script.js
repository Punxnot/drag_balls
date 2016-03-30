"use strict";

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext("2d");
// var x = 450;
// var y = 50;
let ballRadius = 10;
let ballColor = "#0095DD";
var gameStarted = false;
var ballsList = [];

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
      // canvas.onmousemove = this.move(e);
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
}

function animateAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //To do: canvas.width/2
  for (let ball of ballsList) {
    ball.draw();
    ball.fly();
  }
}

var ball1 = new Ball(450, 50);
var ball2 = new Ball(500, 80);
var ball3 = new Ball(320, 140);
ballsList.push(ball1);
ballsList.push(ball2);
ballsList.push(ball3);

for (let ball of ballsList) {
  document.addEventListener("mousedown", function(e) {
    e = e || window.event;
    ball.down(e);
  });
  canvas.addEventListener("mouseup", function(e) {
    e = e || window.event;
    ball.up(e);
  });
}

// document.addEventListener("mousedown", function(e) {
//   e = e || window.event;
//   ball1.down(e);
// });
//
// canvas.addEventListener("mouseup", function(e) {
//   e = e || window.event;
//   ball1.up(e);
// })

// To do: replace setInterval with frames
setInterval(animateAll, 10);
