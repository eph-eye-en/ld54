let structureTypes, levels;
let ui, levelManager;

function preload() {
	preloadConfig();
}

function setup() {
	let cnv = createCanvas(innerWidth, innerHeight);
	cnv.elt.addEventListener('contextmenu', event => event.preventDefault());

	({ structureTypes, levels } = parseConfig());
	levelManager = new LevelManager(structureTypes, levels);
	const lm = levelManager;
	
	const stack1 = new Stack(STACK_HORIZ, [0.3, 0.7,0.1]);
	stack1.children[0] = lm.constraintDrawer;
	const stack2 = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);
	stack1.children[1] = stack2;
	stack2.children[2] = lm.hotbar;
	stack2.children[0] = lm.gridDrawer;
	stack1.children[2] = new Button("Level 1", ()=>levelManager.loadLevel(1), [20,20,200]);

	ui = new Ui(30, 30, width - 60, height - 60, stack1);

	levelManager.loadLevel(0);
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
