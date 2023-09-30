let configStrings = {};

function preloadConfig() {
	configStrings.structures = loadStrings("config/structures.yaml");
}

function parseStructureTypes(grid) {
	const types = {};
	config.structures = jsyaml.load(configStrings.structures.join("\n"));
	for(let s of Object.keys(config.structures))
		types[s] = new Structure(grid, config.structures[s]);
	return types;
}
