let cellSize = 50;
let hotbarSize = 50;
let config = {};

const mainGrid = new Grid(5, 5);
let structureTypes = {};

let ui, gridDrawer, hotbar;

function preload() {
	preloadConfig();
}

function setup() {
	createCanvas(500, 500);
	structureTypes = parseStructureTypes(mainGrid);

	mainGrid.placeAt(1, 1, structureTypes["OxygenProducer"]);
	mainGrid.placeAt(1, 3, structureTypes["Generator"]);

	let split = new Split(SPLIT_VERT, [0.7, 0.1, 0.2]);
	gridDrawer = new GridDrawer(mainGrid);
	split.children[0] = gridDrawer;
	hotbar = new Hotbar(structureTypes, Object.keys(structureTypes));
	split.children[2] = hotbar;

	ui = new Ui(30, 30, width - 60, height - 60, split);
}

function draw() {
	background(51);

	ui.draw();
}
