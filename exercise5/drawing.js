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
  // Jak ma być rysowany statek.
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "#03A062"; // "white";
  ctx.fillStyle = options.fill || "black";

  // Draw the ship in three lines
  ctx.beginPath();
  // Zaznaczamy dziób statku.
  ctx.moveTo(radius, 0);
  // Rysujemy pierwszą prostą.

  // ctx.lineTo(
  // Zamieniamy współrzędne biegunowe na współrzędne kartezjańskie.
  //   Math.cos(Math.PI - angle) * radius,
  //   Math.sin(Math.PI - angle) * radius
  // );

  // Domyślnie, bez przekazania `angle`, w tym momencie mamy kąt wynosi: `0.5 Math.PI / 2`, tj. pierwszą ćwiartkę okręgu (w przedziale 45 stopni).

  // Rysujemy pierwszą krzywą kwadratową.

  // Na podstawie powyższych komentarzy, domyślnie punkty kontrolne będą na pozycji 45 stopni.

  ctx.quadraticCurveTo(
    Math.cos(angle) * radius * curve2,
    Math.sin(angle) * radius * curve2,
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );

  ctx.quadraticCurveTo(
    // radius * curve1 - radius,
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
  // Rysowanie punktów kontrolnych definiujących poziom zakrzywienia krzywych krawędzi statku.
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
    // ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      Math.cos(-angle) * radius * curve2,
      Math.sin(-angle) * radius * curve2,
      radius / 50,
      0,
      2 * Math.PI
    );
    // ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    // Pierwszy argumennt dokładnie reprezentuje pozycję (kropki) na osi x, jaki (punkt zakrzywienia) jest zaimplementowany w momencie rysowania krzywej.
    ctx.arc(radius * curve1 - radius, 0, radius / 50, 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.fill();
  }
  ctx.restore();
}

function draw_asteroid(ctx, radius, segments, options) {
  options = options || {};
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < segments; i++) {
    ctx.rotate((2 * Math.PI) / segments);
    ctx.lineTo(radius, 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (options.guide) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  ctx.restore();
}
