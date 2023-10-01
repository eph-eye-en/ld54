class LevelManager {
	constructor(structureTypes, levels) {
		this.structureTypes = structureTypes;
		this.levels = levels;

		this.gridDrawer = new GridDrawer();
		this.hotbar = new Hotbar(structureTypes);
		this.hotbar.onMousePressed = bindTo(this.hotbarPressed, this);
		this.constraintDrawer = new GridConstraintDrawer(30, structureTypes);
		this.gridDrawer.onMousePressed = bindTo(this.gridCellPressed, this);

		this.grid = null;
		this.levelIdx = null;
	}

	loadLevel(idx) {
		this.levelIdx = idx;
		const l = this.levels[idx];

		this.grid = new Grid(l.shape);
		this.gridDrawer.grid = this.grid;
		this.gridDrawer.hoverStructure = this.structureTypes[l.structures[0]];

		this.hotbar.items = l.structures;
		this.hotbar.selectedIndex = 0;

		this.constraintDrawer.grid = this.grid;
		this.constraintDrawer.constraints = l.constraints;
	}

	loadNextLevel() {
		if(this.levelIdx + 1 < this.levels.length) {
			this.loadLevel(this.levelIdx + 1);
			return true;
		}
		return false;
	}

	hotbarPressed(idx) {
		if(mouseButton === LEFT) {
			this.hotbar.selectedIdx = idx;
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
		if(GridConstraints.satisfies(this.grid, l.constraints))
			console.log("Complete");
	}

	getSelectedStructure() {
		const l = this.levels[this.levelIdx];
		return this.structureTypes[l.structures[this.hotbar.selectedIdx]];
	}
}
