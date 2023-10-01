class UiManager {
	constructor(x, y, w, h, levelManager) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.levelManager = levelManager;

		this.mainMenu = this.createMainMenu();
		this.levelsMenu = this.createLevelsMenu();
		this.levelScreen = this.createLevelScreen();

		this.ui = new Ui(x, y, w, h, this.mainMenu);
	}

	draw() {
		this.ui.draw();
	}

	mousePressed(mx, my) {
		this.ui.mousePressed(mx, my);
	}

	keyPressed(keyCode) {
		if(this.ui.root == this.levelScreen && keyCode == 82)	//82 == 'R'
			this.levelManager.rotatePressed();
	}

	createMainMenu() {
		const stack1 = new Stack(STACK_HORIZ,[0.4,0.6]);
		const stack2 = new Stack(STACK_VERT,[0.5,0.2,0.2,0.2,0.1]);
		const stack3 = new Stack(STACK_VERT,[0.1,0.3,0.6]);
		stack1.children[0] = stack2;
		stack1.children[1] = stack3;

		var but = new Button("Play", this.loadLevelsMenu.bind(this), [20,20,200,0],[100,100,200]);
		but.outlineColour = [0,0,0,0];
		but.fontSize = 60;
		stack2.children[1] = but;
		but = new Button("Level 1", ()=>this.loadLevel(0), [20,20,200,0],[100,100,200]);
		but.outlineColour = [0,0,0,0];
		but.fontSize = 60;
		stack2.children[2] = but;
		but = new Button("Level 2", ()=>this.loadLevel(1), [20,20,200,0],[100,100,200]);
		but.outlineColour = [0,0,0,0];
		but.fontSize = 60;
		stack2.children[3] = but;
		but = new Button("Space Ltd", ()=>this.loadLevel(2), [20,20,200,0],[100,100,200]);
		but.outlineColour = [0,0,0,0];
		but.fontSize = 60;
		stack3.children[1] = but;
		return stack1;
	}

	createLevelsMenu() {
		
		const stack1 = new Stack(STACK_VERT,[0.05,0.95]);
		const bannerstack = new Stack(STACK_HORIZ,[0.9,0.1]);
		const stack2 = new Stack(STACK_HORIZ,[0.3,0.7]);
		stack1.children[0] = bannerstack;
		stack1.children[1] = stack2;
		bannerstack.children[1] = new Square(RIGHT, TOP,
			new Button("X", this.loadMainMenu.bind(this), [150, 50, 50],[225,50,50]));
		stack2.children[0] = new EmailList(3);

		return stack1;
	}

	createLevelScreen() {
		const stack1 = new Stack(STACK_HORIZ, [0.3, 0.7,0.1]);
		stack1.children[0] = this.levelManager.constraintDrawer;
		const stack2 = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);
		stack1.children[1] = stack2;
		stack2.children[0] = this.levelManager.gridDrawer;
		stack2.children[2] = this.levelManager.hotbar;
		return this.wrapWithCloseButton(stack1, this.loadLevelsMenu.bind(this));
	}

	wrapWithCloseButton(child, onClose) {
		const stack = new Stack(STACK_VERT, [0.05, 0.95]);
		stack.children[0] = new Square(RIGHT, TOP,
			new Button("X", onClose, [120, 50, 50],[200,50,50]));
		stack.children[1] = child;
		return stack;
	}

	loadMainMenu() {
		this.ui.root = this.mainMenu;
	}

	loadLevelsMenu() {
		this.ui.root = this.levelsMenu;
	}

	loadLevel(idx) {
		this.ui.root = this.levelScreen;
		this.levelManager.loadLevel(idx);
	}
}