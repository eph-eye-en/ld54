class GridConstraints {
	static satisfies(grid, constraints) {
		for(let r of constraints.resources)
			if(!this.hasNetResourceMinimum(grid, r.res, r.min))
				return false;
		for(let s of constraints.structures)
			if(!this.structureIsPresent(grid, s.slug, s.min))
				return false;
		return true;
	}

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

	static getStructureCount(grid, structSlug) {
		let count = 0;
		for(let s of grid.structures)
			if(s.slug == structSlug)
				count++;
		return count;
	}
	
	static structureIsPresent(grid, structSlug, min) {
		return this.getStructureCount(grid, structSlug) >= min;
	}
}
