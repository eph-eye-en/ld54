let mainGrid;
let structureTypes, levels;
let hotbarItems = ["OxygenProducer", "Generator", "Plants"];
let gridConstraints;

let ui, constraintDrawer, gridDrawer, hotbar;

function preload() {
	preloadConfig();
}

function setup() {
	let cnv = createCanvas(innerWidth, innerHeight);
	cnv.elt.addEventListener('contextmenu', event => event.preventDefault());

	({ structureTypes, levels } = parseConfig());

	mainGrid = new Grid(levels[0].shape);
	gridConstraints = levels[0].constraints;

	const stack1 = new Stack(STACK_HORIZ, [0.3, 0.7]);

	constraintDrawer = new GridConstraintDrawer(mainGrid, gridConstraints, 30);
	stack1.children[0] = constraintDrawer;

	const stack2 = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);
	stack1.children[1] = stack2;

	hotbar = new Hotbar(structureTypes, hotbarItems);
	hotbar.onMousePressed = hotbarPressed;
	stack2.children[2] = hotbar;

	gridDrawer = new GridDrawer(mainGrid, getSelectedStructure());
	gridDrawer.onMousePressed = gridCellPressed;
	stack2.children[0] = gridDrawer;

	ui = new Ui(30, 30, width - 60, height - 60, stack1);
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
		mainGrid.placeAt(cx, cy, getSelectedStructure().copy());
	else if(mouseButton === RIGHT)
		mainGrid.removeAt(cx, cy);
}

function getSelectedStructure() {
	return structureTypes[hotbarItems[hotbar.selectedIdx]];
}
