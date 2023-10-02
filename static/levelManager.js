class LevelManager {
	constructor(structureTypes, levels) {
		this.structureTypes = structureTypes;
		this.levels = levels;
		this.levels.forEach(l => {
			l.unlocked = false;
			l.completed = false;
		});
		this.levels[0].unlocked = true;

		this.onLevelCompleted = null;

		this.gridDrawer = new GridDrawer();
		this.hotbar = new Hotbar(structureTypes);
		this.hotbar.onMousePressed = bindTo(this.hotbarPressed, this);
		this.constraintDrawer = new GridConstraintDrawer(30, structureTypes);
		this.gridDrawer.onMousePressed = bindTo(this.gridCellPressed, this);

		this.grid = null;
		this.levelIdx = null;
	}

	loadLevel(idx) {
		if(!this.levels[idx].unlocked)
			return false;

		this.levelIdx = idx;
		const l = this.levels[idx];

		this.grid = new Grid(l.shape);
		this.gridDrawer.grid = this.grid;
		this.gridDrawer.hoverStructure = this.structureTypes[l.structures[0]];

		this.hotbar.items = l.structures;
		this.hotbar.selectIndex(0);

		this.constraintDrawer.grid = this.grid;
		this.constraintDrawer.constraints = l.constraints;

		return true;
	}

	loadNextLevel() {
		if(this.levelIdx + 1 < this.levels.length) {
			return this.loadLevel(this.levelIdx + 1);
		}
		return false;
	}

	rotatePressed() {
		this.gridDrawer.hoverStructure.rotateClockwise();
	}

	hotbarPressed(idx) {
		if(mouseButton === LEFT) {
			this.hotbar.selectIndex(idx);
			this.gridDrawer.hoverStructure = this.getSelectedStructure();
		}
	}
	
	gridCellPressed(cx, cy) {
		if(mouseButton === LEFT)
			this.grid.placeAt(cx, cy, this.getSelectedStructure().copy());
		else if(mouseButton === RIGHT)
			this.grid.removeAt(cx, cy);
		this.checkComplete();
	}

	checkComplete() {
		const l = this.levels[this.levelIdx];
		if(GridConstraints.satisfies(this.grid, l.constraints)) {
			this.levels[this.levelIdx].completed = true;
			if(this.onLevelCompleted)
				this.onLevelCompleted(this.levelIdx);
		}
	}

	unlockLevel(idx) {
		this.levels[idx].unlocked = true;
	}

	getSelectedStructure() {
		const l = this.levels[this.levelIdx];
		return this.structureTypes[l.structures[this.hotbar.selectedIdx]];
	}
}
