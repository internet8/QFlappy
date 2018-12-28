class Pipe {
	constructor (x, y, w, h) {
		this.x = x;
		this.y = y;
		this.velX = pipeSpeed;
		this.w = w;
		this.h = h;
	}
	
	show () {
		push();
		translate(this.x, this.y);
		image(pipeImg, 0, 0, this.w, this.h);
		pop();
	}
	
	hitboxScore () {
		push();
		translate(this.x, this.y+400);
		fill(255);
		//rect(0, 35, 100, 225);
		pop();
	}
	
	hitboxDeathUp () {
		push();
		translate(this.x, this.y-365);
		fill(0);
		//rect(0, 0, 100, 800);
		pop();
	}
	
	hitboxDeathDown () {
		push();
		translate(this.x, this.y+660);
		fill(0);
		//rect(0, 0, 100, 800);
		pop();
	}
	
	update () {
		this.x -= this.velX;
	}
	
}