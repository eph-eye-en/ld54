let cellSize = 50;
let hotbarSize = 50;
let config = {};

const mainGrid = new Grid(5, 5);
let structureTypes = {};

function preload() {
	preloadConfig();
}

function setup() {
	createCanvas(500, 500);
	structureTypes = parseStructureTypes(mainGrid);

	mainGrid.placeAt(1, 1, structureTypes["OxygenProducer"]);
	mainGrid.placeAt(1, 3, structureTypes["Generator"]);
}

function draw() {
	rectMode(CENTER);
	background(51);

	translate(100, 100);
	drawGrid(mainGrid);

	translate(0, 300);
	drawHotbar(Object.values(structureTypes), hotbarSize);
}

function drawGrid(g) {
	g.forEach((c, x, y) => {
		stroke(200);
		strokeWeight(1);
		if(c.available)
			fill(200, 70);
		else
			fill(c.structure.colour);
		rect(x * cellSize, y * cellSize, cellSize, cellSize, cellSize / 5);
	});
}
