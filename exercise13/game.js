const SpecyaGame = function (id) {
  this.canvas = document.getElementById(id);
  this.c = this.canvas.getContext("2d");
  this.canvas.focus();
  this.guide = false;
  this.ship_mass = 10;
  this.ship_radius = 15;
  this.asteroid_mass = 5000;
  this.asteroid_push = 500000;

  this.mass_destroyed = 500;
  this.score = 0;

  this.health_indicator = new Indicator("health", 5, 5, 100, 10);

  this.score_indicator = new NumberIndicator(
    "score",
    this.canvas.width - 10,
    5
  );

  this.fps_indicator = new NumberIndicator(
    "fps",
    this.canvas.width - 10,
    this.canvas.height - 15,
    { digits: 2 }
  );

  this.ship = new Ship(this.canvas.width / 2, this.canvas.height / 2, 100, 200);

  this.projectiles = [];
  this.asteroids = [];
  this.asteroids.push(this.moving_asteroid());
  this.canvas.addEventListener("keydown", this.keyDown.bind(this), true);
  this.canvas.addEventListener("keyup", this.keyUp.bind(this), true);
  window.requestAnimationFrame(this.frame.bind(this));
};

SpecyaGame.prototype.moving_asteroid = function (elapsed) {
  const asteroid = this.new_asteroid();
  this.push_asteroid(asteroid, elapsed);
  return asteroid;
};

SpecyaGame.prototype.new_asteroid = function () {
  return new Asteroid(
    this.asteroid_mass,
    this.canvas.width * Math.random(),
    this.canvas.height * Math.random()
  );
};

SpecyaGame.prototype.push_asteroid = function (asteroid, elapsed) {
  elapsed = elapsed || 0.015;
  asteroid.push(2 * Math.PI * Math.random(), this.asteroid_push, elapsed);
  asteroid.twist(
    (Math.random() - 0.5) * Math.PI * this.asteroid_push * 0.02,
    elapsed
  );
};

SpecyaGame.prototype.split_asteroid = function (asteroid, elapsed) {
  console.log(asteroid.mass);
  console.log(this.mass_destroyed);
  asteroid.mass -= this.mass_destroyed;
  this.score += this.mass_destroyed;
  const split = 0.25 + 0.5 * Math.random();
  const ch1 = asteroid.child(asteroid.mass * split);
  const ch2 = asteroid.child(asteroid.mass * (1 - split));
  [ch1, ch2].forEach(function (child) {
    if (child.mass < this.mass_destroyed) {
      this.score += child.mass;
      console.log(child.mass);
      console.log(this.mass_destroyed);
    } else {
      this.push_asteroid(child, elapsed);
      this.asteroids.push(child);
    }
  }, this);
};

SpecyaGame.prototype.keyDown = function (e) {
  this.key_handler(e, true);
};
SpecyaGame.prototype.keyUp = function (e) {
  this.key_handler(e, false);
};

SpecyaGame.prototype.key_handler = function (e, value) {
  let nothing_handled = false;
  switch (e.key || e.keyCode) {
    case "ArrowLeft":
    case 37: // left arrow
      this.ship.left_thruster = value;
      break;
    case "ArrowUp":
    case 38: // up arrow
      this.ship.thruster_on = value;
      break;
    case "ArrowRight":
    case 39: // right arrow
      this.ship.right_thruster = value;
      break;
    case "ArrowDown":
    case 40:
      this.ship.retro_on = value;
      break;
    case " ":
    case 32: //spacebar
      this.ship.trigger = value;
      break;
    case "g":
    case 71: // g for guide
      if (value) this.guide = !this.guide;
      break;
    default:
      nothing_handled = true;
  }
  if (!nothing_handled) e.preventDefault();
};

SpecyaGame.prototype.frame = function (timestamp) {
  if (!this.previous) this.previous = timestamp;
  var elapsed = timestamp - this.previous;
  this.fps = 1000 / elapsed;
  this.update(elapsed / 1000);
  this.draw();
  this.previous = timestamp;
  window.requestAnimationFrame(this.frame.bind(this));
};

SpecyaGame.prototype.update = function (elapsed) {
  this.ship.compromised = false;
  this.asteroids.forEach(function (asteroid) {
    asteroid.update(elapsed, this.c);
    if (collision(asteroid, this.ship)) {
      this.ship.compromised = true;
    }
  }, this);
  this.ship.update(elapsed, this.c);
  this.projectiles.forEach(function (p, i, projectiles) {
    p.update(elapsed, this.c);
    if (p.life <= 0) {
      projectiles.splice(i, 1);
    } else {
      this.asteroids.forEach(function (asteroid, j) {
        if (collision(asteroid, p)) {
          projectiles.splice(i, 1);
          this.asteroids.splice(j, 1);
          this.split_asteroid(asteroid, elapsed);
        }
      }, this);
    }
  }, this);
  if (this.ship.trigger && this.ship.loaded) {
    this.projectiles.push(this.ship.projectile(elapsed));
  }
};

SpecyaGame.prototype.draw = function () {
  this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);

  if (this.guide) {
    draw_grid(this.c);
    this.asteroids.forEach(function (asteroid) {
      draw_line(this.c, asteroid, this.ship);
      if (this.projectiles.length > 0) {
        this.projectiles.forEach((p) => {
          draw_line(this.c, asteroid, p);
        });
      }
    }, this);
    this.fps_indicator.draw(this.c, this.fps);
  }
  this.asteroids.forEach(function (asteroid) {
    asteroid.draw(this.c, this.guide);
  }, this);
  this.ship.draw(this.c, this.guide);
  this.projectiles.forEach(function (p) {
    p.draw(this.c);
  }, this);

  this.health_indicator.draw(this.c, this.ship.health, this.ship.max_health);

  this.score_indicator.draw(this.c, this.score);
};

function collision(obj1, obj2) {
  return distance_between(obj1, obj2) < obj1.radius + obj2.radius;
}
function distance_between(obj1, obj2) {
  return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
}
