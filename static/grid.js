class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.cells = [];
		for(let x = 0; x < this.width; x++) {
			const arr = [];
			for(let y = 0; y < this.height; y++)
				arr.push({
					valid: true,
					available: true,
					structure: null,
				});
			this.cells.push(arr);
		}
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
		const c = this.getCell(x, y);
		if(!c.valid || !c.available)
			return false;

		c.available = false;
		c.structure = structure;
		return true;
	}

	removeAt(x, y) {
		const c = this.getCell(x, y);
		if(c.valid && !c.available)
			c.structure.remove();
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
