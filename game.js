const canvas = document.getElementById("game-canvas");
const cxt = canvas.getContext("2d");

cxt.fillStyle = "black";
cxt.fillRect(0, 0, 900, 500);

class Sprite {
  constructor(position) {
    this.position = position;
  }

  draw() {
    cxt.fillStyle = "red";
    cxt.fillRect(this.position.x, this.position.y, 50, 150);
  }
}

const player1 = new Sprite({
  x: 0,
  y: 350,
});

const player2 = new Sprite({
  x: 750,
  y: 350,
});

player1.draw();
player2.draw();
