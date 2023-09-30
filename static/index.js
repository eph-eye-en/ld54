let cellSize = 50;
let hotbarSize = 50;
let config = {};

const mainGrid = new Grid(5, 5);
let structureTypes = {};
let hotbarItems = ["OxygenProducer", "Generator"];

let ui, gridDrawer, hotbar;

function preload() {
	preloadConfig();
}

function setup() {
	createCanvas(500, 500);
	structureTypes = parseStructureTypes(mainGrid);

	let split = new Split(SPLIT_VERT, [0.7, 0.1, 0.2]);

	hotbar = new Hotbar(structureTypes, hotbarItems);
	hotbar.onMousePressed = hotbarClicked;
	split.children[2] = hotbar;

	gridDrawer = new GridDrawer(mainGrid, getSelectedStructure());
	gridDrawer.onMousePressed = gridCellClicked;
	split.children[0] = gridDrawer;

	ui = new Ui(30, 30, width - 60, height - 60, split);
}

function draw() {
	background(51);

	ui.draw();
}

function mousePressed() {
	ui.mousePressed(mouseX, mouseY);
}

function hotbarClicked(idx) {
	hotbar.selectedIdx = idx;
}

function gridCellClicked(cx, cy) {
	mainGrid.placeAt(cx, cy, getSelectedStructure());
}

function getSelectedStructure() {
	return structureTypes[hotbarItems[hotbar.selectedIdx]];
}
