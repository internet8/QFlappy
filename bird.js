class Bird {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.velX = panSpeed;
		this.velY = 0;
		this.size = 50;
	}
	
	show () {
		push();
		translate(this.x, this.y);
		image(birdImg, 0, 0, this.size, this.size);
		pop();
	}
	
	update () {
		if (this.velY < 10) {
			this.velY += gravity;
		}
			this.y += this.velY;
	}
	
	flap () {
		this.velY = -9;
	}
}