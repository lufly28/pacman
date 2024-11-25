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


// events
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

// Events
startButton.addEventListener("click", (e) => {
  on = !on;
  if (on) {
    startButton.textContent = "Stop";
  } else {
    startButton.textContent = "Start";
  }
});






function drawPacman(x, y, radius, mouthAngle, ctx) {
  ctx.save(); // Guarda el estado actual del contexto

  // Mueve el origen al centro de Pac-Man
  ctx.translate(x, y);

  // Calcula el ángulo de rotación según la dirección
  let rotationAngle;
  switch (direction) {
    case "ArrowDown":
      rotationAngle = Math.PI / 2; // 90 grados
      break;
    case "ArrowUp":
      rotationAngle = -Math.PI / 2; // -90 grados
      break;
    case "ArrowLeft":
      rotationAngle = Math.PI; // 180 grados
      break;
    case "ArrowRight":
    default:
      rotationAngle = 0; // Sin rotación para la derecha
      break;
  }

  ctx.rotate(rotationAngle); // Rota el contexto en el ángulo deseado

  // Dibuja el Pac-Man en su dirección
  ctx.beginPath();
  ctx.arc(0, 0, radius, mouthAngle, 2 * Math.PI - mouthAngle);
  ctx.lineTo(0, 0);
  ctx.fillStyle = "yellow";
  ctx.fill();

  // Dibuja el ojo
  ctx.beginPath();
  ctx.arc(-10, -20, 6, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  // //Dibuja el ojo profe Agos
  // ctx.beginPath();
  // let eyeX = radius / 8;
  // let eyeY = -radius / 2;
  // let eyeRadius = radius / 9;
  // ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
  // ctx.fillStyle = 'black';
  // ctx.fill();

  ctx.restore(); // Restaura el contexto para que no afecte otros dibujos
}

function updateMouth() {
  mouthAngle += mouthSpeed;
  if (mouthAngle > 0.8 || mouthAngle < 0) mouthSpeed *= -1;
}

function updatePosition() {

  if (detectCollision(x, y, radius, canvas, direction)) {
    lives -= 1;

    if (lives ==0){

      console.log('You lost!')
      on = false;
      startButton.textContent = 'start';
      x = 50;
      y = 50;
      lives = 10;

    } else {

      x = 50;
      y = 50;
      direction = 'ArrowRight';
    }
    return
  }

  switch (direction) {
    case "ArrowRight":
      x += 1;
      break;
    case "ArrowLeft":
      x -= 1;
      break;
    case "ArrowDown":
      y += 1;
      break;
    case "ArrowUp":
      y -= 1;
      break;
    default:
      console.warn("direction no coincide con ninguno de los casos");
      break;
  }
}

function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGridSystem(); 
  drawPacman(x, y, radius, mouthAngle, ctx);
  updatePosition();
  updateMouth();
  score();
}

function detectCollision(xCircle, yCircle, radius, canvas, direction) {
  if (xCircle + radius >= canvas.width && direction === "ArrowRight") {
    // Colisión detectada con la pared derecha
    return true;
  }

  if (xCircle - radius <= 0 && direction === "ArrowLeft") {
    // Colisión detectada con la pared izquierda
    return true;
  }

  if (yCircle + radius >= canvas.height && direction === "ArrowDown") {
    // Colisión detectada con la pared inferior
    return true;
  }

  if (yCircle - radius <= 0 && direction === "ArrowUp") {
    // Colisión detectada con la pared superior
    return true;
  }

  return false;
}  







// Canvas setup
// bucle principal
setInterval(() => {
  if (on) drawFrame();
}, 1000 / 60);
