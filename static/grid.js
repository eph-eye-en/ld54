class Grid {
	constructor(shape) {
		this.width = shape.length;
		this.height = shape[0].length;

		this.cells = [];
		for(let row of shape) {
			const arr = [];
			for(let cell of row)
				if(cell)
					arr.push({
						valid: true,
						available: true,
						structure: null,
					});
				else
					arr.push({ valid: false });
			this.cells.push(arr);
		}

		this.structures = new Set();
	}
	
	getCell(x, y) {
		if(x < 0 || x >= this.width
		|| y < 0 || y >= this.height)
			return {
				valid: false,
			};
		return this.cells[x][y];
	}

	placeAt(x, y, structure) {
		if(!structure.canPlaceAt(this, x, y))
			return false;
		
		structure.fillCells(this, x, y);
		this.structures.add(structure);
		return true;
	}

	fillCell(x, y, structure) {
		const c = this.getCell(x, y);
		if(!c.valid || !c.available)
			return false;

		c.available = false;
		c.structure = structure;
		return true;
	}

	removeAt(x, y) {
		const c = this.getCell(x, y);
		if(c.valid && !c.available) {
			this.structures.delete(c.structure);
			c.structure.emptyCells();
		}
	}

	emptyCell(x, y) {
		const c = this.getCell(x, y);
		if(c.valid && !c.available) {
			c.available = true;
			return true;
		}
		return false;
	}

	forEach(f) {
		for(let x = 0; x < this.width; x++)
			for(let y = 0; y < this.height; y++) {
				const c = this.getCell(x, y);
				if(c.valid)
					f(c, x, y);
			}
	}
}
