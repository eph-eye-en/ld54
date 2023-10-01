let configStrings = {};

function preloadConfig() {
	configStrings.structures = loadStrings("config/structures.yaml");
}

function parseStructureTypes() {
	const types = {};
	config.structures = jsyaml.load(configStrings.structures.join("\n"));
	for(let s in config.structures) {
		const str = config.structures[s];
		const { shape, centre } =
			parseStructureShape(str.shape);
		str.shape = shape;
		str.centre = centre;
		types[s] = new Structure(str);
	}
	return types;
}

function parseStructureShape(shape) {
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
