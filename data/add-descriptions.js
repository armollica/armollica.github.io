#!/usr/bin/env node

var fs = require("fs");

fs.readFile("./data/projects.json", "utf8", function(error, projects) {
	if (error) throw error;

	projects = JSON.parse(projects);

	projects.forEach(function(project) {
		var filename = `./data/descriptions/${project.name}.html`;
		console.log(`Adding description from ${filename}`);
		project.description = fs.readFileSync(filename, "utf8", function(error) {
			if (error) throw console.warn(`Problem with ${project.name}`);
		});
	});

	fs.writeFile("./data/projects-full.json", JSON.stringify(projects), function(error) {
		if (error) throw error;
	});
});