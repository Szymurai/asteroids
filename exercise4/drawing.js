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

// ctx.arc(centerX, centerY, radius, startAngle, endAngle);
function draw_pacman(ctx, xCoordinate, yCoordinate, radius, open) {
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  xCoordinate = xCoordinate || width / 2;
  yCoordinate = yCoordinate || height / 2;
  ctx.save();
  fill = "yellow";
  stroke = "#FF2222";
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  startAngle = open * 0.2 * Math.PI;
  endAngle = (2 - open * 0.2) * Math.PI;
  ctx.beginPath();
  ctx.arc(xCoordinate, yCoordinate, radius, startAngle, endAngle);
  ctx.lineTo(xCoordinate, yCoordinate);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

function draw_ship(ctx, xCoordinate, yCoordinate, radius, options) {
  options = options || {};
  ctx.save();
  // Optionally draw a guide showing the collision radius
  if (options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(xCoordinate, yCoordinate, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  // Set some
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  let angle = (options.angle || 0.2 * Math.PI) / 2;

  // Draw the ship in three lines
  ctx.beginPath();
  ctx.moveTo(xCoordinate + radius, yCoordinate);
  ctx.lineTo(
    xCoordinate + Math.cos(Math.PI - angle) * radius,
    yCoordinate + Math.sin(Math.PI - angle) * radius
  );
  ctx.lineTo(
    xCoordinate + Math.cos(Math.PI + angle) * radius,
    yCoordinate + Math.sin(Math.PI + angle) * radius
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
