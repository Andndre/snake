let snake;
let size = 20;
var speed = 8;
let grid = true;
var scoreP;
let hack = false;

function setup() {
	createCanvas(700, 700);
	snake = new Snake(size);
	scoreP = createP("Score: 0");
	frameRate(speed);
}

function keyPressed() {
	if (snake.isDead) return;
	if (keyCode == LEFT_ARROW) {
		if (snake.dir.x != 1) {
			snake.setDir(-1, 0);
		}
	} else if (keyCode == RIGHT_ARROW) {
		if (snake.dir.x != -1) {
			snake.setDir(1, 0);
		}
	} else if (keyCode == UP_ARROW) {
		if (snake.dir.y != 1) {
			snake.setDir(0, -1);
		}
	} else if (keyCode == DOWN_ARROW) {
		if (snake.dir.y != -1) {
			snake.setDir(0, 1);
		}
	}
}

function mouseClicked() {
	if (!hack) return;
	if (snake.isDead) return;
	snake.move(true);
}

function draw() {
	background(0);
	if (grid) {
		let maxI = floor(width / snake.size);
		for (let i = 0; i < maxI; i++) {
			push();
			strokeWeight(1);
			stroke(100);
			line(0, i * snake.size, width, i * snake.size);
			line(i * snake.size, 0, i * snake.size, height);
			pop();
		}
	}
	snake.update();
	snake.show();
}
