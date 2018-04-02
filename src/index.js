"use strict";

let Page = require("./page");
let DEF = require("./defaults");
let { abort, promisify, repr } = require("./util");
let mkdirp = require("mkdirp");
let fs = require("fs");
let path = require("path");

let readDir = promisify(fs.readdir);
let mkdir = promisify(mkdirp);

module.exports = function generatePages(referenceDir, config) {
	let {
		content = DEF.contentDir,
		views = DEF.bundle,
		target = DEF.targetDir,
		transforms = DEF.transforms
	} = config;
	if(views.substr) {
		views = {
			bundle: views,
			name: DEF.viewName
		};
	}

	let [contentDir, bundle, targetDir] = [content, views.bundle, target].
		map(filepath => resolvePath(filepath, referenceDir));

	mkdir(targetDir).
		then(_ => readDir(contentDir)).
		then(filenames => {
			let pages = makePages(filenames, contentDir, referenceDir, transforms);

			let render = require(bundle);
			pages.forEach(page => {
				page.render(targetDir, views.name, render);
			});
		});
};

// determines relevant files and generates a page from each
function makePages(filenames, contentDir, referenceDir, transforms) {
	return filenames.reduce((memo, filename) => {
		let extension = determineExtension(filename);
		let transform = extension && transforms[extension];
		if(transform) { // ignore unknown files
			let filepath = path.resolve(contentDir, filename);
			let page = new Page(filepath, extension, referenceDir, transform);
			memo.push(page);
		}
		return memo;
	}, []);
}

function resolvePath(filepath, referenceDir) {
	if(filepath.substr(0, 2) !== "./") {
		abort(`path must be relative: ${repr(filepath)}`);
	}
	return path.resolve(referenceDir, filepath);
}

function determineExtension(filename) {
	let parts = filename.split(".");
	let { length } = parts;
	return length === 1 ? null : parts[length - 1];
}
