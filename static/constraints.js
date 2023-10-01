class GridConstraints {
	static getNetResource(grid, resource) {
		let net = 0;
		for(let s of grid.structures) {
			net += s.produces(resource);
			net -= s.consumes(resource);
		}
		return net;
	}

	static hasNetResourceMinimum(grid, resource, min) {
		return this.getNetResource(grid, resource) >= min;
	}

	static getStructureCount(grid, structName) {
		let count = 0;
		for(let s of grid.structures)
			if(s.name == structName)
				count++;
		return count;
	}
	
	static structureIsPresent(grid, structName, min) {
		return this.getStructureCount(grid, structName) >= min;
	}
}
