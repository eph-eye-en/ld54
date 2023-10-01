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
	
	// const stack1 = new Stack(STACK_HORIZ, [0.3, 0.7,0.1]);
	// stack1.children[0] = lm.constraintDrawer;
	// const stack2 = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);
	// stack1.children[1] = stack2;
	// stack2.children[2] = lm.hotbar;
	// stack2.children[0] = lm.gridDrawer;
	// stack1.children[2] = new Button("Level 1", ()=>levelManager.loadLevel(1), [20,20,200],[100,100,200]);

	// const stack1 = new Stack(STACK_HORIZ,[0.4,0.6]);
	// const stack2 = new Stack(STACK_VERT,[0.5,0.2,0.2,0.2,0.1]);
	// const stack3 = new Stack(STACK_VERT,[0.1,0.3,0.6]);
	// stack1.children[0] = stack2;
	// stack1.children[1] = stack3;
	// stack2.children[1] = new Button("Level 1", ()=>levelManager.loadLevel(0), [20,20,200,0],[100,100,200]);
	// stack2.children[2] = new Button("Level 2", ()=>levelManager.loadLevel(1), [20,20,200,0],[100,100,200]);
	// stack2.children[3] = new Button("Level 3", ()=>levelManager.loadLevel(2), [20,20,200,0],[100,100,200]);
	// stack3.children[1] = new Button("Space Ltd", ()=>levelManager.loadLevel(3), [20,20,200,0],[100,100,200]);



	// ui = new Ui(30, 30, width - 60, height - 60, stack1);

	// levelManager.loadLevel(0);
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
