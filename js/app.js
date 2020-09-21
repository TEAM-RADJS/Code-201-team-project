//javascript
mapData = {};

function makeNewMaze(){
	//Robert TODO: build a process by which a new array of arrays is created with the proper lengths, and to ensure that there IS a path to the end
	//Robert TODO: assign mapData these key value pairs {map: [ [], [], [], [] ],  playerPosition: [y, x], mosterNOrigin: [y, x]}
	var mapSize = 50;
	var mapMargin = mapSize / 3;

	mapData.map = [];

	for (let i = 0; i < mapSize; i++) {
		mapData.map.push([]);
		for (let j = 0; j < mapSize; j++) {
			mapData.map[i].push(0);
		}
	}

	function generateMap(){

		mapData.playerPosition = [];
		mapData.playerPosition.push(Math.ceil(Math.random()*(mapSize-2*mapMargin)+mapMargin));
		mapData.playerPosition.push(Math.ceil(Math.random()*(mapSize-2*mapMargin)+mapMargin));

		mapData.map[mapData.playerPosition[0]][mapData.playerPosition[1]] = 1;

		curY = mapData.playerPosition[0];
		curX = mapData.playerPosition[1];

		var triedToStep = 0;
		var madeAStep = 0;
		var monsterCount = 0;

		do {
			var upRand = Math.random()*10;
			var downRand = Math.random()*10;
			var rightRand = Math.random()*10;
			var leftRand = Math.random()*10;

			if (upRand > downRand && upRand > rightRand && upRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY-1][curX] == 0 && (mapData.map[curY-1][curX+1] != 1 || mapData.map[curY-1][curX-1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curY-=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} else if (downRand > rightRand && downRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY+1][curX] == 0 && (mapData.map[curY+1][curX+1] != 1 || mapData.map[curY+1][curX-1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curY+=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} else if (rightRand > leftRand) {
				triedToStep++;
				if (mapData.map[curY][curX+1] == 0 && (mapData.map[curY+1][curX+1] != 1 || mapData.map[curY-1][curX+1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curX+=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} else {
				triedToStep++;
				if (mapData.map[curY][curX-1] == 0 && (mapData.map[curY+1][curX-1] != 1 || mapData.map[curY-1][curX-1] != 1)){
					triedToStep = 0;
					madeAStep++;
					curX-=1;
					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					} else {
						mapData.map[curY][curX] = 1;
					}
				}
			} 
			if (triedToStep == 10) {
				madeAStep++;
				if (upRand > downRand && upRand > rightRand && upRand > leftRand) {
					curY--;
				} else if (downRand > rightRand && downRand > leftRand) {
					curY++;
				} else if (rightRand > leftRand) {
					curX++;
				} else {
					curX--;
				}
				if (mapData.map[curY][curX] != 2 && mapData.map[curY][curX] != 4 && mapData.map[curY][curX] != 1 && madeAStep%20 != 0){
					mapData.map[curY][curX] = 1;
				} else {

					if (madeAStep%120 == 0){
						monsterCount++;
						mapData.map[curY][curX] = parseInt('4'+String(monsterCount));
						eval('mapData.monster'+monsterCount+'Origin = []');
						eval('mapData.monster'+monsterCount+'Origin.push(curY)');
						eval('mapData.monster'+monsterCount+'Origin.push(curX)');
					} else if (madeAStep%20 == 0){
						mapData.map[curY][curX] = 2;
					}

				}
				triedToStep = 0;
			}
		} while ((curY != 0 && curY != mapSize-1) && (curX != 0 && curX != mapSize-1));
		return madeAStep;
	}


	var goodMap = false;

	while (!goodMap) {
		var stepsCounted = generateMap();
		if (stepsCounted > mapSize*8) {
			goodMap = true;
		}
	}
}

function showEnvironment(){
	function showTable(increments){
		var checkPosition = mapData['map'][(mapData['playerPosition'][0])+increments[0]][(mapData['playerPosition'][1])+increments[1]]
		//TODO: use DOM to assign the image with id String((mapData['playerPosition'][0])+increments[0])+'-'+String((mapData['playerPosition'][1])+increments[1]) a source attribute dependant on the value of checkPosition
	}
	//TODO: write a for loop to iterate over all image id's and assign the empty image source
	//Robert TODO: translate the printEnvironment function from Dungeon_Game into javaScript here
}

function hunterMove(){
	//Robert TODO: translate aStar function from Dungeon_Game into javaScript here
	var setOfMonsters = Object.keys(mapData);
	setOfMonsters.splice(0, 2);

	for (let z = 0; z < setOfMonsters.length; z++) {
		
		var sampleMap = JSON.parse(JSON.stringify(mapData.map));

		for (let i = 0; i < sampleMap.length; i++){
			for (let j = 0; j < sampleMap[i].length; j++){
				if (sampleMap[i][j] == 1){
					sampleMap[i][j] == 'f';
				} else {
					sampleMap[i][j] == 'w';
				}
			}
		}

		var didSomething = true;
		var steps = 0;
		sampleMap[mapData.playerPosition[0]][mapData.playerPosition[1]] = steps;

		while (sampleMap[mapData[setOfMonsters[z]][0]][mapData[setOfMonsters[z]][1]] == "f") {
			if (didSomething == false) {
				break;
			}
			didSomething = false;
			for (let i = 0; i < sampleMap.length; i++){
				for (let j = 0; j < sampleMap[i].length; j++){
					if (sampleMap[i][j] == steps){
						if (i != 0){
							if (sampleMap[i-1][j] == 'f'){
								sampleMap[i-1][j] = steps+1;
								didSomething = true;
							}
						}
						if (i != sampleMap.length-1){
							if (sampleMap[i+1][j] == 'f'){
								sampleMap[i+1][j] = steps+1;
								didSomething = true;
							}
						}
						if (j != 0){
							if (sampleMap[i][j-1] == 'f'){
								sampleMap[i][j-1] = steps+1;
								didSomething = true;
							}
						}
						if (j != sampleMap[0].length-1){
							if (sampleMap[i][j+1] == 'f'){
								sampleMap[i][j+1] = steps+1;
								didSomething = true;
							}
						}
					}
				}
			}
			steps++;
		}
		if (sampleMap [mapData[setOfMonsters[z]][0] + 1][mapData[setOfMonsters[z]][1]] == steps-1){
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = 1;
			mapData[setOfMonsters[z][0]] += 1;
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = parseInt('4'+z);
		} else if (sampleMap[mapData[setOfMonsters[z]][0] - 1][mapData[setOfMonsters[z]][1]] == steps-1) {
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = 1;
			mapData[setOfMonsters[z][0]] -= 1;
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = parseInt('4'+z);
		} else if (sampleMap[mapData[setOfMonsters[z]][0]][mapData[setOfMonsters[z]][1] + 1] == steps-1) {
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = 1;
			mapData[setOfMonsters[z][1]] += 1;
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = parseInt('4'+z);
		} else if (sampleMap[mapData[setOfMonsters[z]][0]][mapData[setOfMonsters[z]][1] - 1] == steps-1) {
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = 1;
			mapData[setOfMonsters[z][1]] -= 1;
			mapData[setOfMonsters[z]][0][mapData[setOfMonsters[z]][1]] = parseInt('4'+z);
		}
	}
}

function movePlayer(keyPressed){
	var acceptedMoves = ['w', 'a', 's', 'd', 'space'];
	var playerY = mapData['playerPosition'][0];
	var playerX = mapData['playerPosition'][1];
	var theMap = mapData['map'];
	//TODO: check if acceptedMoves.includes(keyPressed)
	//TODO: if not, return a null value
	//TODO: if yes create conditions for each key option other than space;
	//TODO: for w, check if theMap[(playerY)-1][(playerX)] is a traversible tile; if it is playerY -= 1;
	//TODO: for s, check if theMap[(playerY)+1][(playerX)] is a traversible tile; if it is playerY += 1;
	//TODO: for a, check if theMap[(playerY)][(playerX)-1] is a traversible tile; if it is playerX -= 1;
	//TODO: for d, check if theMap[(playerY)][(playerX)+1] is a traversible tile; if it is playerX += 1;
	//TODO: outside of the key specific conditionals, call the hunterMove() function and then the showEnvironment function
}

function startGame(){
	//TODO: create a variable mapSize and assign it the value of the '#askSize' input form
	makeNewMaze(mapSize);
	//TODO: use DOM to start audio
	//TODO: Use DOM to identify #gamePlayTable and assign it to a variable
	//TODO: write a loop to iterate over mapData['map'] and create a 'tr' element for each inner array, and then in a nested for loop a 'td' for each index inside of that array, and assign that td the innerHTML of an 'img' element. Assign the image  an id of String(i)+'-'+String(j)
	showEnvironment();
	document.addEventListener("keyup", function(e){
		e.preventDefault(); 
		movePlayer(e.key);
	})
}

//TODO: identify #startButton element and attach an eventListener; eventListener will launch startGame 