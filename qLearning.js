var Q = [];

for (let i = 0; i <= 8262; i++) {
	Q[i] = [0, 0];
}

function calcQ (state, decision, reward, nextState) {
	Q[state][decision] = round(Q[state][decision] + 0.7 * (reward + 1 * max(Q[nextState][0], Q[nextState][1]) - Q[state][decision]));
	//Q[state][decision] = round(0.7 * (reward + 1 * max(Q[nextState][0], Q[nextState][1]) - Q[state][decision])); 
	//Q[state][decision] = round(reward + 0.8 * max(Q[nextState][0], Q[nextState][1]));
	//Q[state][decision] = (1-0.7) * Q[state][decision] + 0.7 * (reward + 1 * max(Q[nextState][0], Q[nextState][1]));
}

function getState (distX, distY, ab) {
	let state = 0;
	for (let i = 0; i <= distX; i++) {
		for (let j = 0; j <= distY; j++) {
			for (let k = 0; k <= ab; k++) {
				state++;
			}
		}
	}
	return state;
}

function getAction (state) {
	let rnd = int(random(0, 200));
	if (rnd == 7) {
		return 1;
	} else if (rnd == 88) {
		return 0;
	}
	if (Q[state][0] == Q[state][1]) {
		//return int(random(0, 2));
		return 0;
	} else if (max(Q[state][0], Q[state][1]) == Q[state][0]) {
		return 0;
	}
	return 1;
}
