let configStrings = {};

function preloadConfig() {
	configStrings.structures = loadStrings("config/structures.yaml");
	configStrings.levels = loadStrings("config/levels.yaml");
}

function parseConfig() {
	return {
		structureTypes: parseStructureTypes(),
		levels: parseLevels(),
	};
}

function parseStructureTypes() {
	const types = {};
	const structures = jsyaml.load(configStrings.structures.join("\n"));
	for(let s in structures) {
		const str = structures[s];
		const { shape, centre } =
			parseShape(str.shape);
		str.shape = shape;
		str.centre = centre;
		if(!str.produces)
			str.produces = {};
		if(!str.consumes)
			str.consumes = {};
		types[s] = new Structure(str);
	}
	return types;
}

function parseLevels() {
	const levels = [];
	const conf = jsyaml.load(configStrings.levels.join("\n"));
	for(let i in conf) {
		const l = conf[i];
		levels.push({
			name: l.name,
			shape: parseShape(l.shape).shape,
			structures: l.structures,
			constraints: parseGridConstraints(l.constraints),
		});
	}
	return levels;
}

function parseGridConstraints({ resources = {}, structures = {} }) {
	return {
		resources: Object.entries(resources)
			.map(([r, m]) => ({ res: r, min: m })),
		structures: Object.entries(structures)
			.map(([s, m]) => ({ struct: s, min: m })),
	};
}

function parseShape(shape) {
	let cells = [];
	const lines = shape.toUpperCase().split("\n");
	let y = 0;
	let centre = { x: 0, y: 0 };
	for(let l of lines) {
		let x = 0;
		let row = [];
		cells.push(row);
		for(let c of l) {
			row.push(c == "X" || c == "O");
			if(c == "O")
				centre = { x, y };
			x++;
		}
		y++;
	}
	padArrayToRectangle(cells, false);
	return {
		shape: transposeRectangularArray(cells),
		centre,
	};
}

function padArrayToRectangle(arr, val) {
	const w = Math.max(arr.map(r => r.length));
	for(let r of arr)
		while(r.length < w)
			r.push(val);
}

function transposeRectangularArray(arr) {
	return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}
