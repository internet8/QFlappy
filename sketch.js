var panSpeed = 5;
var gravity = 0.3;
var bird;
var pipeSpeed = 2.5;
var pipes = [];
var pipeImg;
var birdImg;
var bg;
var interval = setInterval(spawnPipe, 2500);
//data
var currentScore = 0;
var bestScore = 0;
var totalScore = 0;
var deaths = 0;
var gen = 1;
var addScore = false;
var lastDeathsNum = 0;
var lastAction = 0;
var lastState = 0;
var lastTotalScore = 0;
var bestMatch;
var abowe = 0;

function setup () {
	bg = loadImage("assets/bg.png");
	pipeImg = loadImage("assets/pipes.png");
	birdImg = loadImage("assets/bird.png");
	window.canvas = createCanvas(600, 800);
	bird = new Bird(100, canvas.height/2);
	pipes.push(new Pipe(600, -150, 100, 1100));
	bestMatch = pipes[0];
	frameRate(60);
}

function draw () {
	background(bg);
	bird.update();
	bird.show();
	for (let i = 0; i < pipes.length; i++) {
		pipes[i].show();
		pipes[i].update();
		pipes[i].hitboxScore();
		pipes[i].hitboxDeathUp();
		pipes[i].hitboxDeathDown();
		// detect socre
		if (rectRect(bird.x, bird.y, bird.size, bird.size, pipes[i].x, pipes[i].y+400, 100, 225) && addScore) {
			currentScore++;
			totalScore++;
			addScore = false;
		}
		if (rectRect(bird.x, bird.y, bird.size, bird.size, pipes[i].x, pipes[i].y-365, 100, 800)) {
			gameOver();
			return;
		} else if (rectRect(bird.x, bird.y, bird.size, bird.size, pipes[i].x, pipes[i].y+660, 100, 800)) {
			gameOver();
			return;
		}
	}
	if (bird.y < 0 || bird.y > 800) {
		gameOver();
		return;
	}
	// hub
	fill(0);
	text("SCORE: " + currentScore, 5, 15);
	text("BEST SCORE: " + bestScore, 5, 30);
	text("TOTAL SCORE: " + totalScore, 5, 45);
	text("DEATHS: " + deaths, 5, 60);
	text("AVG SCORE PER DEATH: " + (totalScore/deaths).toFixed(2), 5, 75);
	//text("GENERATION: " + gen, 5, 90);
	let distX = int(getNextPipeDist()/10);
	let distY = int(getNextLowerPipeDist()/10);
	let state = getState(distX, distY, above); 
	//let badZone = int(getNextLowerPipeDist()/5);
	if (bird.velY > 0 && state != lastState) {
		// learning
		//console.log(getNextPipeDist()); RANGE 0-500
		//console.log(getNextLowerPipeDist()); RANGE -800 to +800
		let action = getAction(state);
		let rew = 1;
		/*
		if (totalScore > lastTotalScore) {
			rew =  +1000;
		}
		*/
		if (deaths > lastDeathsNum) {
			rew =  -1000;
		}
		calcQ(lastState, lastAction, rew, state);
		//console.log(Q[lastState]);
		/*if (badZone < 120 || badZone == 240) {
			bird.flap();
		}*/
		if (action == 1) {
			bird.flap();
		}
		lastState = state;
		lastAction = action;
		lastDeathsNum = deaths;
		lastTotalScore = totalScore;
	}
}

function getNextPipeDist () {
	let bestDist = 500;
	for (let i = 0; i < pipes.length; i++) {
		let dist = pipes[i].x+125 - bird.x;
		if (dist > 0 && dist < bestDist) {
			bestDist = dist;
		}
	}
	return bestDist;
}

function getNextLowerPipeDist () {
	let bestDist = 500;
	let bestDistL = 0;
	for (let i = 0; i < pipes.length; i++) {
		let distL = bird.y - pipes[i].y-625;
		let dist = pipes[i].x+125 - bird.x;
		if (dist > 0 && dist < bestDist) {
			bestDist = dist;
			bestDistL = distL;
			bestMatch = pipes[i];
		}
	}
	if (bestDistL < 0) {
		above = 1;
	} else {
		above = 0;
	}
	return abs(bestDistL);
}

function gameOver () {
	clearInterval(interval);
	interval = setInterval(spawnPipe, 2500);
	if (currentScore > bestScore) {
		bestScore = currentScore;
	}
	deaths++;
	currentScore = 0;
	pipes = [];
	setup();
}

function spawnPipe() {
	addScore = true;
	if (!document.hidden) {
		pipes.push(new Pipe(600, int(random(-300, 0)), 100, 1100));
		if (pipes.lenght > 3) {
			pipes.shift();
		}
	}
}

function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
	if (r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h) {
		return true;
	}
	return false;
}

function keyPressed () {
	if (keyCode == 32) {
		//bird.flap();
	}
}