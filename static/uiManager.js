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
		this.controlsScreen = this.createTextScreen(
			"Controls", this.theme.controls, () => this.loadUi(this.mainMenu));
		this.aboutScreen = this.createTextScreen(
			"About", this.theme.about, () => this.loadUi(this.mainMenu));

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
		stack1.children[0] = stack2;

		var but = this.createTransparentButton("Play",
			() => this.loadUi(this.levelsMenu));
		but.fontSize = 60;
		stack2.children[1] = but;

		but = this.createTransparentButton("Controls",
			() => this.loadUi(this.controlsScreen));
		but.fontSize = 60;
		stack2.children[2] = but;

		but = this.createTransparentButton("About",
			() => this.loadUi(this.aboutScreen));
		but.fontSize = 60;
		stack2.children[3] = but;

		const stack3 = new Stack(STACK_VERT,[0.15, 0.3, 0.55]);
		stack1.children[1] = stack3;
		const title = new TextBox("Space LTD", this.theme.text.colour, 90,
			RIGHT, CENTER);
		stack3.children[1] = title;

		return stack1;
	}

	createLevelsMenu() {
		// for(i=0; 0<this.levelManager.levels; i++)
		// {
		// 	if this.levelManager.levels[i]

		// }

		const stack1 = new Stack(STACK_HORIZ,[0.3,0.025,0.675]);
		const stack2 = new Stack(STACK_VERT,[0.02,0.03,0.03,0.03,0.05,0.52,0.1,0.02]);
		stack1.children[2] = stack2;
		const stack3 = new Stack(STACK_HORIZ,[0.58,0.4,0.02]);
		
		stack2.children[1] = new TextBox("To: Underpaid Spacestation contractor 402",20,40);
		stack2.children[2] = new TextBox("From: Space Captain Big Boss Man",20,40);
		stack2.children[3] = new TextBox("Subject: Build me a space station!!!",20,40);
		stack2.children[5] = new TextBox(this.levelManager.levels[0].description,20,40);
		stack2.children[6] = stack3;

		stack3.children[1] = new Button("Start Level",() => this.loadLevel(0),[50,200,50],[20,255,20])

		const el = new EmailList(this.levelManager.levels);
		el.onMousePressed = idx => {
			stack2.children[5].text = this.levelManager.levels[idx].description;

			stack3.children[1].clickedEvent = () => this.loadLevel(idx);
		};
		stack1.children[0] = el;
		stack1.bgColour = 220;
		return this.wrapWithTitleBar("Levels", stack1,
			() => this.loadUi(this.mainMenu));
	}
	

	createLevelScreen() {
		const stack1 = new Stack(STACK_HORIZ, [0.3, 0.7,0.1]);
		stack1.children[0] = this.levelManager.constraintDrawer;
		const stack2 = new Stack(STACK_VERT, [0.7, 0.1, 0.2]);
		stack1.children[1] = stack2;
		stack2.children[0] = this.levelManager.gridDrawer;
		stack2.children[2] = this.levelManager.hotbar;

		const modal = this.createModal(
			"Complete", "Level complete!\nGood work", "Continue",
			() => this.loadUi(this.levelsMenu))

		const popup = new Popup(0.3, 0.3, stack1, modal);
		const root = this.wrapWithTitleBar("Level", popup,
			() => this.loadUi(this.levelsMenu));
		return { root, popup };
	}

	createTextScreen(title, text, onClose) {
		const th = this.theme.text;
		const body = new TextBox(text, th.colour, th.size, LEFT, TOP);
		return this.wrapWithTitleBar(title, body, onClose);
	}

	createModal(title, body, buttonText, action) {
		const th = this.theme;

		const stack1 = new Stack(STACK_VERT, [0.25, 0.5, 0.25]);
		stack1.bgColour = this.theme.popupBgColour;

		const tb1 = new TextBox(title, th.text.colour, th.text.size);
		tb1.style = BOLDITALIC;
		tb1.bgColour = this.theme.titleBar.background;
		stack1.children[0] = tb1;
		
		const tb2 = new TextBox(body, th.text.colour, th.text.size);
		stack1.children[1] = tb2;
		
		const stack2 = new Stack(STACK_HORIZ, [0.6, 0.4]);
		stack1.children[2] = stack2;
		const btn = this.createTransparentButton(buttonText, action);
		stack2.children[1] = btn;

		return stack1;
	}

	wrapWithTitleBar(title, child, onClose) {
		const th = this.theme;

		const stack1 = new Stack(STACK_VERT,
			[th.titleBar.weight, 1 - th.titleBar.weight]);
		stack1.bgColour = th.bgColour;
			
		const stack2 = new Stack(STACK_HORIZ,
			[1 - th.titleBar.weight, th.titleBar.weight]);
		stack2.bgColour = this.theme.titleBar.background;

		const tb = new TextBox(title, th.text.colour, th.text.size,
			LEFT, CENTER);
		tb.style = BOLDITALIC;
		stack2.children[0] = tb;

		stack2.children[1] = new Square(RIGHT, TOP,
			new Button("X", onClose, [120, 50, 50], [200, 50, 50]));

		stack1.children[0] = stack2;
		stack1.children[1] = child;
		return stack1;
	}

	loadUi(root) {
		this.ui.root = root;
	}

	loadLevel(idx) {
		const succ = this.levelManager.loadLevel(idx);
		if(succ) {
			this.loadUi(this.levelScreen);
			this.levelCompletePopup.hidePopup();
		}
	}

	onLevelCompleted(idx) {
		if(idx + 1 < this.levelManager.levels.length)
			this.levelManager.unlockLevel(idx + 1);
		this.levelCompletePopup.showPopup();
	}
}