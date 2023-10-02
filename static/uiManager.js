class UiManager {
	constructor(x, y, w, h, theme, levelManager) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.theme = theme;
		this.levelManager = levelManager;
		this.levelManager.onLevelCompleted = idx => this.onLevelCompleted(idx);

		this.mainMenu = this.createMainMenu();
		this.levelsMenu = this.createLevelsMenu();
		const ls = this.createLevelScreen();
		this.levelScreen = ls.root;
		this.levelCompletePopup = ls.popup;

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

	createTransparentButton(text, onMousePressed) {
		const b = new Button(text, onMousePressed, [0, 0],
			this.theme.buttonHover);
		b.outlineColour = [0, 0];
		return b;
	}

	createMainMenu() {
		const stack1 = new Stack(STACK_HORIZ,[0.4,0.6]);
		const stack2 = new Stack(STACK_VERT,[0.5,0.2,0.2,0.2,0.1]);
		const stack3 = new Stack(STACK_VERT,[0.1,0.3,0.6]);
		stack1.children[0] = stack2;
		stack1.children[1] = stack3;

		var but = this.createTransparentButton("Play",
			() => this.loadLevelsMenu());
		but.fontSize = 60;

		stack2.children[1] = but;
		but = this.createTransparentButton("Controls", () => this.loadLevel(0));
		but.fontSize = 60;
		stack2.children[2] = but;

		but = this.createTransparentButton("Credits", () => this.loadLevel(1));
		but.fontSize = 60;

		stack2.children[3] = but;
		but = this.createTransparentButton("Space Ltd", () => this.loadLevel(2));
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
		const el = new EmailList(this.levelManager.levels);
		el.onMousePressed = idx => this.loadLevel(idx);
		stack2.children[0] = el;

		return stack1;
	}

	createLevelScreen() {
		const stack1 = new Stack(STACK_HORIZ, [0.3, 0.7,0.1]);
		stack1.children[0] = this.levelManager.constraintDrawer;
		const stack2 = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);
		stack1.children[1] = stack2;
		stack2.children[0] = this.levelManager.gridDrawer;
		stack2.children[2] = this.levelManager.hotbar;
		const modal = new Button(
			"Continue?",
			() => this.loadLevelsMenu(),
			[100,100,200],
			[50,50,140]);
		const popup = new Popup(0.3, 0.3, stack1, modal);
		const root =
			this.wrapWithCloseButton(popup, this.loadLevelsMenu.bind(this));
		return { root, popup };
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
		const succ = this.levelManager.loadLevel(idx);
		if(succ) {
			this.ui.root = this.levelScreen;
			this.levelCompletePopup.hidePopup();
		}
	}

	onLevelCompleted(idx) {
		if(idx + 1 < this.levelManager.levels.length)
			this.levelManager.unlockLevel(idx + 1);
		this.levelCompletePopup.showPopup();
	}
}