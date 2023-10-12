const canvas = document.getElementById("game-canvas");
const cxt = canvas.getContext("2d");
const PUNCH_COOLDOWN = 1000;
const movementStep = 2;

cxt.fillStyle = "black";
cxt.fillRect(0, 0, 900, 500);

class Sprite {
  constructor(position, healthPosition, imgSrc) {
    this.position = position;
    this.healthPosition = healthPosition;
    this.armLength = 50;
    this.armWidth = 10;
    this.health = 100;
    this.healthBarW = 50;
    this.healthBarHeight = 5;
    this.canPunch = true;
    this.img = new Image();
    this.img.src = imgSrc;
    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    cxt.fillStyle = "transparent";
    cxt.fillRect(this.position.x, this.position.y, 71, 150);
    cxt.fillRect(
      this.position.x + 50,
      this.position.y + 150 / 2 - this.armWidth / 2,
      this.armLength,
      this.armWidth
    );

    cxt.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.img.width,
      this.img.height
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
    }, PUNCH_COOLDOWN);
  }

  moveLeft() {
    if (this.position.x > 0) this.position.x -= 4;
  }
  moveRight() {
    if (this.position.x < canvas.width) this.position.x += 4;
  }
}

const player1 = new Sprite(
  {
    x: 50,
    y: 350,
  },
  { x: 10, y: 10 },
  "assets/ryan.svg"
);

const player2 = new Sprite(
  {
    x: 700,
    y: 350,
  },
  { x: 490, y: 10 },
  "assets/ryan2.svg"
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
