const canvas = document.getElementById("game-canvas");
const cxt = canvas.getContext("2d");

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
  }

  moveLeft() {
    if (this.position.x > 0) this.position.x -= 15;
  }
  moveRight() {
    if (this.position.x < canvas.width) this.position.x += 15;
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

player1.draw();
player2.draw();

document.addEventListener("keydown", (event) => {
  if (event.key == "a") {
    player1.moveLeft();
    render();
  } else if (event.key == "d") {
    player1.moveRight();
    render();
  } else if (event.key == "p") {
    player1.throwPunch(player2);
  }
});

function clearCanvas() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  cxt.fillStyle = "black";
  cxt.fillRect(0, 0, 900, 500);
}

function render() {
  clearCanvas();
  player1.draw();
  player2.draw();
}
