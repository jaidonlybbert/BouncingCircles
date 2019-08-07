const WIDTH = 800;
const HEIGHT = 800;
const GROUND_HEIGHT = 200;

var canvas = document.getElementById("Circles");
var ctx = canvas.getContext("2d");

function Background() {
  this.draw = function() {
    // Sky
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Ground
    ctx.fillStyle = "#666";
    ctx.fillRect(0, (HEIGHT - GROUND_HEIGHT), WIDTH, GROUND_HEIGHT);
  }
}

function Circle() {
  this.size = Math.floor(Math.random() * 11) + 10;
  this.posx = Math.floor(Math.random() * (WIDTH - this.size)) + 1;
  this.posy = Math.floor(Math.random() * (HEIGHT - this.size)) + 1;
  this.velocity = [0, -10];

  this.draw = function() {
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(this.posx, this.posy, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  this.move = function() {
    this.posx += this.velocity[0];
    this.posy += this.velocity[1];
  }
}

function Game() {
  this.bg = new Background();
  this.circles = [];

  this.draw = function() {
    this.bg.draw();
    for (var i = 0; i < this.circles.length; i++) {
      this.circles[i].draw();
    }
  }

  this.loop = function() {
    console.log("y1");
    this.c = new Circle();
    this.circles.push(this.c);
    console.log(this.circles.length);
    for (var i = 0; i < this.circles.length; i++) {
      console.log("yee");
      this.circles[i].move();
    }
    this.draw();
  }

}

var g = new Game();
setInterval(function() { g.loop(); }, 16.67);
