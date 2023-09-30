let cellSize = 50;
let hotbarSize = 50;
let config = {};

const mainGrid = new Grid(5, 5);
let structureTypes = {};

let ui;

function preload() {
	preloadConfig();
}

function setup() {
	createCanvas(500, 500);
	structureTypes = parseStructureTypes(mainGrid);

	mainGrid.placeAt(1, 1, structureTypes["OxygenProducer"]);
	mainGrid.placeAt(1, 3, structureTypes["Generator"]);

	ui = new Split(SPLIT_VERT, [0.7, 0.1, 0.2]);
	ui.children[0] = new GridDrawer(mainGrid);
	ui.children[2] = new Hotbar(structureTypes, Object.keys(structureTypes));
}

function draw() {
	background(51);

	//translate(100, 100);
	//drawGrid(mainGrid);
	
	//translate(0, 300);
	//drawHotbar(Object.values(structureTypes), hotbarSize);

	ui.draw(30, 30, width - 60, height - 60);
}
