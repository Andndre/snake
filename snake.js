class Snake {
	constructor(size) {
		this.pos = createVector();
		this.posSinceTurn = createVector(-1, 0);
		this.size = size;
		this.isDead = false;
		this.tail = [];
		this.setDir(1, 0);
		this.generateFood();
	}

	show() {
		fill(200, 0, 0);
		rect(this.pos.x, this.pos.y, this.size);

		fill(0, 255, 0);
		rect(
			this.food.x + this.size / 4,
			this.food.y + this.size / 4,
			this.size - this.size / 2
		);

		fill(255);
		for (let i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, this.size);
		}
	}

	move(hack) {
		let prevX = this.pos.x;
		let prevY = this.pos.y;
		this.pos.x = this.pos.x + this.dir.x * this.size;
		this.pos.y = this.pos.y + this.dir.y * this.size;

		if (
			dist(this.pos.x, this.pos.y, this.food.x, this.food.y) < 1 ||
			hack
		) {
			this.tail.push(createVector(prevX, prevY));
			this.generateFood();
			if (this.tail.length % 20 == 0 && speed < 15) {
				speed++;
				frameRate(speed);
			}
			scoreP.html("Score: " + this.tail.length);
		} else {
			if (this.tail.length != 0) {
				this.tail.splice(0, 1);
				this.tail.push(createVector(prevX, prevY));
			}
		}
	}

	update() {
		this.move(false);

		if (
			this.pos.x < 0 ||
			this.pos.x > width - this.size ||
			this.pos.y < 0 ||
			this.pos.y > height - this.size
		) {
			this.stop("Game Over");
			this.isDead = true;
			return;
		}

		if (this.win()) {
			this.stop("You Win!!");
			return;
		}

		for (let t of this.tail) {
			if (this.pos.x == t.x && this.pos.y == t.y) {
				this.stop("Game Over");
				this.isDead = true;
				return;
			}
		}
	}

	stop(message) {
		noLoop();
		createP(message);
	}

	win() {
		return (
			this.tail.length + 1 ==
			floor(width / this.size) * floor(height / this.size)
		);
	}

	generateFood() {
		let count = floor(width / this.size);
		this.food = createVector(
			floor(random(1, count)) * this.size,
			floor(random(1, count)) * this.size
		);
		for (let t of this.tail) {
			if (dist(t.x, t.y, this.food.x, this.food.y) < 1) {
				this.generateFood();
				break;
			}
		}
	}

	setDir(x, y) {
		if (
			this.pos.x == this.posSinceTurn.x &&
			this.pos.y == this.posSinceTurn.y
		) {
			return;
		}
		this.posSinceTurn = createVector(this.pos.x, this.pos.y);
		this.dir = createVector(x, y);
	}
}
