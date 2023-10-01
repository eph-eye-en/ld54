const margin = 30;

let structureTypes, levels;
let levelManager, uiManager;

function preload() {
	preloadConfig();
}

function setup() {
	let cnv = createCanvas(innerWidth, innerHeight);
	cnv.elt.addEventListener('contextmenu', event => event.preventDefault());

	({ structureTypes, levels } = parseConfig());
	levelManager = new LevelManager(structureTypes, levels);
	const lm = levelManager;
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
