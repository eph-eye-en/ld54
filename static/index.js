const margin = 30;

let uiManager;

function preload() {
	preloadConfig();
}

function setup() {
	const cnv = createCanvas(innerWidth, innerHeight);
	cnv.elt.addEventListener('contextmenu', event => event.preventDefault());

	const { structureTypes, levels } = parseConfig();
	const levelManager = new LevelManager(structureTypes, levels);
	uiManager = new UiManager(
		margin, margin, width - margin * 2, height - margin * 2,
		levelManager);
}

function draw() {
	background(51);

	uiManager.draw();
}

function mousePressed(event) {
	uiManager.mousePressed(mouseX, mouseY);

	if(mouseX >= 0 && mouseX < width
	&& mouseY >= 0 && mouseY < height)
		return false;
}
