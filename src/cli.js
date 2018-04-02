"use strict";

let DEFAULTS = require("./defaults");
let { abort, repr } = require("./util");
let parseArgs = require("minimist");

let HELP = `
Usage:
  $ complate-ssg [options] [content_directory [target_directory]]

${repr("content_directory")} defaults to ${repr(DEFAULTS.contentDir)}
${repr("target_directory")} defaults to ${repr(DEFAULTS.targetDir)}

Options:
  -h, --help
    display this help message
  -v, --views
    specify path to views bundle (defaults to ${repr(DEFAULTS.bundle)})
`.trim();

module.exports = function parseCLI(argv = process.argv.slice(2), help = HELP) {
	argv = parseArgs(argv, {
		alias: {
			v: "views",
			h: "help"
		}
	});

	if(argv.help) {
		abort(help, 0);
	}

	let referenceDir = process.cwd();
	let [contentDir, targetDir] = argv._;
	return {
		referenceDir,
		contentDir,
		targetDir,
		views: argv.views
	};
};
