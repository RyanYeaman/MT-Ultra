const canvas = document.getElementById("game-canvas");
const cxt = canvas.getContext("2d");
const PUNCH_COOLDOWN = 1000; // Cooldown in milliseconds (1 second)
const movementStep = 2; // Adjust movement step for smooth movement

cxt.fillStyle = "black";
cxt.fillRect(0, 0, 900, 500);

class Sprite {
  constructor(position, healthPosition) {
    this.position = position;
    this.healthPosition = healthPosition;
    this.armLength = 50;
    this.armWidth = 10;
    this.health = 100;
    this.healthBarW = 50;
    this.healthBarHeight = 5;
    this.canPunch = true;
  }

  draw() {
    cxt.fillStyle = "red";
    cxt.fillRect(this.position.x, this.position.y, 50, 150);

    cxt.fillRect(
      this.position.x + 50,
      this.position.y + 150 / 2 - this.armWidth / 2,
      this.armLength,
      this.armWidth
    );

    this.drawHealthBar();
  }

  drawHealthBar() {
    cxt.fillStyle = "green";
    cxt.fillRect(this.healthPosition.x, this.healthPosition.y, 300, 20);
  }

  throwPunch(opponent) {
    const punchReach = 90;

    if (!this.canPunch) {
      console.log("this punch is on cooldown");
      return;
    }
    if (
      this.position.x < opponent.position.x + punchReach &&
      this.position.x + punchReach > opponent.position.x
    ) {
      console.log("Punch landed!");
      opponent.health -= 10;
      console.log(opponent.health);
    } else {
      console.log("Punch missed.");
    }

    this.canPunch = false;

    setTimeout(() => {
      this.canPunch = true;
    }, this.punchCooldown);
  }

  moveLeft() {
    if (this.position.x > 0) this.position.x -= 2;
  }
  moveRight() {
    if (this.position.x < canvas.width) this.position.x += 2;
  }
}

const player1 = new Sprite(
  {
    x: 0,
    y: 350,
  },
  { x: 10, y: 10 }
);

const player2 = new Sprite(
  {
    x: 750,
    y: 350,
  },
  { x: 490, y: 10 }
);

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
  if (event.key === "a") {
    player1.isMovingLeft = true;
  } else if (event.key === "d") {
    player1.isMovingRight = true;
  }
}

function handleKeyUp(event) {
  if (event.key === "a" || event.key === "d") {
    player1.isMovingLeft = false;
    player1.isMovingRight = false;
  } else if (event.key === "p" && player1.canPunch) {
    player1.throwPunch(player2);
  }
}

function gameLoop(timestamp) {
  updateGameLogic();
  render();
  requestAnimationFrame(gameLoop);
}

function updateGameLogic() {
  if (player1.isMovingLeft) {
    player1.moveLeft(movementStep);
  }
  if (player1.isMovingRight) {
    player1.moveRight(movementStep);
  }
}

function render() {
  clearCanvas();
  player1.draw();
  player2.draw();
}

function clearCanvas() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  cxt.fillStyle = "black";
  cxt.fillRect(0, 0, 900, 500);
}

requestAnimationFrame(gameLoop);
