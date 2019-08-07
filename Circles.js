// Jaidon Lybbert
// August 6, 2019

const WIDTH = 800;
const HEIGHT = 800;
const GROUND_HEIGHT = 200;

// UNIT CONVERSIONS
const FPS = 60; // 1 SECOND = 60 FRAMES
const METER = 120; // 1 METER = 40 PIXELS
const METER_PER_SECOND = METER / FPS; // 1 M/S = 0.67 PX/FRAME
const GRAVITY = 9.8 * METER_PER_SECOND / FPS; // 9.8 M/S^2 = 0.11 PX/FRAME^2
const FRICTION_COEFFICIENT = 0.001;

var canvas = document.getElementById("Circles");
var ctx = canvas.getContext("2d");

function Background() {
  this.draw = function() {
    // Sky
    ctx.fillStyle = "#88F";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Ground
    ctx.fillStyle = "#4F8";
    ctx.fillRect(0, (HEIGHT - GROUND_HEIGHT), WIDTH, GROUND_HEIGHT);
    // Half-Width distance
    ctx.fillStyle = "yellow";
    ctx.fillRect(WIDTH / 4, (HEIGHT - GROUND_HEIGHT), WIDTH / 2, GROUND_HEIGHT / 10);
    // Person
    ctx.fillStyle = "blue";
    ctx.fillRect(300, HEIGHT - METER * 2, 20, METER * 2);
    // METER STICK
    ctx.fillstyle = "blue";
    ctx.fillRect(0, 0, 20, METER);
  }
}

function Circle() {
  this.size = Math.floor(Math.random() * 11) + 10;
  this.posx = Math.floor(Math.random() * (WIDTH - this.size)) + 1;
  this.posy = Math.floor(Math.random() * (HEIGHT - this.size)) + 1;
  this.baseline = this.posy;
  this.velocity = [0, -(METER_PER_SECOND * 5), 0];

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

  this.accelerate = function() {
    this.velocity[1] += GRAVITY;
  }

  this.setPos = function(posx, posy) {
    this.posx = posx;
    this.posy = posy;
    this.baseline = posy;
  }

  this.setVel = function(velx, vely) {
    this.velocity[0] = velx;
    this.velocity[1] = vely;
  }

  this.setRad = function(radius) {
    this.size = radius;
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


  this.physx = function() {
    // Gravity Acceleration
    for (var i = 0; i < this.circles.length; i++) {
      if ((this.circles[i].posy + this.circles[i].velocity[1]) >= this.circles[i].baseline) {
        if (this.circles[i].velocity[1] < 0.1) {
          this.circles[i].velocity[1] = 0;
        } else {
          this.circles[i].velocity[1] *= -0.9;
          console.log(this.circles[i].velocity[1]);
        }
      } else {
        this.circles[i].accelerate();
      }

      // Friction
      if ((Math.abs(this.circles[i].posy - this.circles[i].baseline) < 2)) {
        this.circles[i].velocity[0] -= (FRICTION_COEFFICIENT * this.circles[i].velocity[0]);
      }

      this.circles[i].move();
    }
  }

  this.loop = function() {
    this.physx();
    this.draw();
  }
}

var g = new Game();
var c = new Circle();
c.setPos(400, 700);
c.setRad(METER * 0.078 / 2) // Baseball = 78 mm in Diameter
g.circles.push(this.c);
setInterval(function() { g.loop(); }, 16.67);
