const padding = 30;
let uiWidth, uiHeight, uiX, uiY;

let uiManager;
let bgImg;

function preload() {
	preloadConfig();
	bgImg = loadImage("images/backdrop.png");
}

function setup() {
	const cnv = createCanvas(innerWidth, innerHeight);
	cnv.elt.addEventListener('contextmenu', event => event.preventDefault());

	const s = Math.min(width / bgImg.width, height / bgImg.height);
	uiWidth = bgImg.width * s;
	uiHeight = bgImg.height * s;
	uiX = (width - uiWidth) / 2;
	uiY = (height - uiHeight) / 2;

	const { theme, structureTypes, levels } = parseConfig();
	const levelManager = new LevelManager(structureTypes, levels);
	uiManager = new UiManager(
		padding, padding, uiWidth - padding * 2, uiHeight - padding * 2,
		theme, levelManager);
}

function draw() {
	background(10, 10, 50);

	translate(uiX, uiY);

	imageMode(CORNER);
	image(bgImg, 0, 0, uiWidth, uiHeight);

	uiManager.draw();
}

function mousePressed() {
	uiManager.mousePressed(mouseX - uiX, mouseY - uiY);
}

function keyPressed() {
	uiManager.keyPressed(keyCode);
}
