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
	let cnv = createCanvas(innerWidth, innerHeight);
	cnv.elt.addEventListener('contextmenu', event => event.preventDefault());
	structureTypes = parseStructureTypes();

	let stack = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);

	hotbar = new Hotbar(structureTypes, hotbarItems);
	hotbar.onMousePressed = hotbarPressed;
	stack.children[2] = hotbar;

	gridDrawer = new GridDrawer(mainGrid, getSelectedStructure());
	gridDrawer.onMousePressed = gridCellPressed;
	stack.children[0] = gridDrawer;

	ui = new Ui(30, 30, width - 60, height - 60, stack);
}

function draw() {
	background(51);

	ui.draw();
}

function mousePressed(event) {
	ui.mousePressed(mouseX, mouseY);

	if(mouseX >= 0 && mouseX < width
	&& mouseY >= 0 && mouseY < height)
		return false;
}

function hotbarPressed(idx) {
	if(mouseButton === LEFT) {
		hotbar.selectedIdx = idx;
		gridDrawer.hoverStructure = getSelectedStructure();
	}
}

function gridCellPressed(cx, cy) {
	if(mouseButton === LEFT)
		getSelectedStructure().copy().placeAt(mainGrid, cx, cy);
	else if(mouseButton === RIGHT)
		mainGrid.removeAt(cx, cy);
}

function getSelectedStructure() {
	return structureTypes[hotbarItems[hotbar.selectedIdx]];
}
