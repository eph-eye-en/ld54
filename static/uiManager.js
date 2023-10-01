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

	createMainMenu() {
		return new Button("Play", this.loadLevelsMenu.bind(this),
			[100, 100, 255]);
	}

	createLevelsMenu() {
		const stack = new Stack(STACK_VERT, [1, 0.1, 1, 0.1, 1]);
		for(let i = 0; i < 3; i++)
			stack.children[i * 2] = new Button(
				`Level ${i + 1}`,
				() => this.loadLevel(i),
				[100, 100, 255]);
		return stack;
	}

	createLevelScreen() {
		const stack1 = new Stack(STACK_HORIZ, [0.3, 0.7,0.1]);
		stack1.children[0] = this.levelManager.constraintDrawer;
		const stack2 = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);
		stack1.children[1] = stack2;
		stack2.children[0] = this.levelManager.gridDrawer;
		stack2.children[2] = this.levelManager.hotbar;
		return stack1;
	}

	loadLevelsMenu() {
		this.ui.root = this.levelsMenu;
	}

	loadLevel(idx) {
		this.ui.root = this.levelScreen;
		this.levelManager.loadLevel(idx);
	}
}