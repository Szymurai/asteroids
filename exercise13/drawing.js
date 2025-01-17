function draw_grid(ctx, minor, major, stroke, fill) {
  minor = minor || 10;
  major = major || minor * 5;
  ctx.save();
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  for (var x = 0; x < width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.lineWidth = x % major == 0 ? 0.5 : 0.25;
    ctx.stroke();

    if (x % major == 0) {
      ctx.fillText(x, x, 10);
    }
  }

  for (var y = 0; y < height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.lineWidth = y % major == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (y % major == 0) {
      ctx.fillText(y, 0, y + 10);
    }
  }

  ctx.restore();
}

function draw_pacman(ctx, radius, mouth) {
  ctx.save();
  fill = "yellow";
  stroke = "#FF2222";
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  angle = 0.2 * Math.PI * mouth;
  ctx.beginPath();
  ctx.arc(0, 0, radius, angle, -angle);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

function draw_ship(ctx, radius, options) {
  options = options || {};
  let angle = (options.angle || 0.5 * Math.PI) / 2;
  let curve1;
  if (!options.curve1 && options.curve1 !== 0) {
    curve1 = options.curve1 || 0.25;
  } else {
    curve1 = options.curve1;
  }
  let curve2 = options.curve2 || 0.75;
  ctx.save();

  // Optionally draw a guide showing the collision radius
  if (options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "#03A062"; // "white";
  ctx.fillStyle = options.fill || "black";

  // Draw the ship in three lines
  ctx.beginPath();
  ctx.moveTo(radius, 0);

  ctx.quadraticCurveTo(
    Math.cos(angle) * radius * curve2,
    Math.sin(angle) * radius * curve2,
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );

  ctx.quadraticCurveTo(
    -radius * curve1,
    0,
    Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius
  );

  ctx.quadraticCurveTo(
    Math.cos(-angle) * radius * curve2,
    Math.sin(-angle) * radius * curve2,
    radius,
    0
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (options.guide) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.beginPath();

    ctx.moveTo(Math.cos(-angle) * radius, Math.sin(-angle) * radius);
    ctx.lineTo(0, 0);
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    ctx.moveTo(-radius, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(
      Math.cos(angle) * radius * curve2,
      Math.sin(angle) * radius * curve2,
      radius / 50,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      Math.cos(-angle) * radius * curve2,
      Math.sin(-angle) * radius * curve2,
      radius / 50,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(radius * curve1 - radius, 0, radius / 50, 0, 2 * Math.PI);
    ctx.fill();
  }

  if (options.thruster) {
    ctx.save();
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(
      (Math.cos(Math.PI + angle * 0.8) * radius) / 2,
      (Math.sin(Math.PI + angle * 0.8) * radius) / 2
    );
    ctx.quadraticCurveTo(
      -radius * 2,
      0,
      (Math.cos(Math.PI - angle * 0.8) * radius) / 2,
      (Math.sin(Math.PI - angle * 0.8) * radius) / 2
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function draw_asteroid(ctx, radius, shape, options) {
  sortedNumbers = [...shape].sort((a, b) => a - b);
  options = options || {};
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < shape.length; i++) {
    ctx.rotate((2 * Math.PI) / shape.length);
    ctx.lineTo(radius + radius * options.noise * shape[i], 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (options.guide) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(
      0,
      0,
      radius + radius * options.noise * sortedNumbers[0],
      0,
      2 * Math.PI
    );
    ctx.stroke();

    ctx.lineWidth = 0.2;
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
      0,
      0,
      radius + radius * options.noise * sortedNumbers[sortedNumbers.length - 1],
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }

  ctx.restore();
}

function draw_ghost(ctx, radius, options) {
  options = options || {};
  const feet = options.feet || 4;
  const head_radius = radius * 0.8;
  const foot_radius = head_radius / feet;
  ctx.save();
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "red";
  ctx.lineWidth = options.lineWidth || radius * 0.05;
  ctx.beginPath();
  for (foot = 0; foot < feet; foot++) {
    ctx.arc(
      2 * foot_radius * (feet - foot) - head_radius - foot_radius,
      radius - foot_radius,
      foot_radius,
      0,
      Math.PI
    );
  }
  ctx.lineTo(-head_radius, radius - foot_radius);
  ctx.arc(0, head_radius - radius, head_radius, Math.PI, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(
    -head_radius / 2.5,
    head_radius - radius * 1.1,
    head_radius / 3,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    -head_radius / 2.5 + 1.5 * foot_radius + head_radius / 3,
    head_radius - radius * 1.1,
    head_radius / 3,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(
    -head_radius / 2.5 - head_radius / 12 + 1.5 * foot_radius + head_radius / 3,
    head_radius - radius * 1.1 + head_radius / 12,
    head_radius / 6,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    -head_radius / 2.5 - head_radius / 12,
    head_radius - radius * 1.1 + head_radius / 12,
    head_radius / 6,
    0,
    2 * Math.PI
  );
  ctx.fill();
  ctx.restore();
}

function draw_projectile(ctx, radius, lifetime) {
  ctx.save();
  ctx.fillStyle = "rgb(100%, 100%, " + 100 * lifetime + "%)";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function draw_line(ctx, obj1, obj2) {
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(obj1.x, obj1.y);
  ctx.lineTo(obj2.x, obj2.y);
  ctx.stroke();
  ctx.restore();
}
