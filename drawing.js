const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "#000000";
const ctx = canvas.getContext("2d");

function drawGridSystem() {
  ctx.strokeStyle = "#00FF00";
  ctx.lineWidth = 0.25;
  ctx.fillStyle = "#009900";

  for (let x = 0; x < canvas.width; x += 10) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.lineWidth = x % 50 === 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (x % 50 === 0) ctx.fillText(x, x, 10);
  }

  for (let y = 0; y < canvas.height; y += 10) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.lineWidth = y % 50 === 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (y % 50 === 0) ctx.fillText(y, 0, y + 10);
  }
}

function drawCoordinate(ctx, x, y) {
  ctx.fillStyle = "#00FF00";
  ctx.fillText(`(${x},${y})`, x, y);
}

// messi
// Ghost Class
class Ghost {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = 1; // Change in x-position (movement direction)
    this.dy = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0.25 * Math.PI, 1.25 * Math.PI, true); // Mouth shape
    ctx.lineTo(0, this.radius * -0.7); // Top of the mouth
    ctx.arc(0, 0, this.radius * 0.6, 0, 2 * Math.PI, true); // Ghost body
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  updatePosition(pacmanX, pacmanY) {
    // Simple AI to chase Pacman
    const dx = pacmanX - this.x;
    const dy = pacmanY - this.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      this.dx = dx > 0 ? 1 : -1;
    } else {
      this.dy = dy > 0 ? 1 : -1;
    }

    // Check for wall collisions (basic implementation)
    if (this.x + this.radius * this.dx >= canvas.width || this.x + this.radius * this.dx <= 0) {
      this.dx *= -1;
    }
    if (this.y + this.radius * this.dy >= canvas.height || this.y + this.radius * this.dy <= 0) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Check for collision with Pacman
    if (
      detectCollision(this.x, this.y, this.radius, pacmanX, pacmanY, radius)
    ) {
      lives -= 1;
      if (lives === 0) {
        console.log('You lost!');
        on = false;
        startButton.textContent = 'Start';
        x = 50;
        y = 50;
        lives = 10;
      } else {
        x = 50;
        y = 50;
        direction = 'ArrowRight';
      }
    }
  }
}

function detectCollision(x1, y1, r1, x2, y2, r2) {
  // Detect collision between two circles
  const dx = x1 - x2;
  const dy = y1 - y2;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < r1 + r2;
}

let x = 50;
let y = 50;
let radius = 50;
let mouthAngle = 0;
let mouthSpeed = 0.1;
let direction = "ArrowRight";
let on = false;
const startButton = document.querySelector('.start-button');
let lives = 10;

const score = () => {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.font = 'bold 40px Courier';
  ctx.fillText('LIVES: ' + lives, 640, 50);
  ctx.restore();
}

// Events
document.body.addEventListener("keydown", (e) => {
  console.log("event", e.key);
  if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    direction = e.key;
  }
});
