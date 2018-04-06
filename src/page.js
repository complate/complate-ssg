"use strict";

let File = require("./stream");
let { repr } = require("./util");
let colonParse = require("metacolon");
let path = require("path");

module.exports = class Page {
	constructor(filepath, filename, extension, referenceDir, transform) {
		this.source = filepath;
		this.slug = filename.substr(0, filename.length - extension.length - 1);
		this.target = `${this.slug}.html`; // NB: name only, without path
		this.referenceDir = referenceDir;
		this.transform = transform;
	}

	// writes HTML to disk via complate rendering
	render(targetDir, viewName, render, pageIndex) {
		this.parse(pageIndex).
			then(page => {
				let filepath = path.resolve(targetDir, this.target);
				let relPath = path.relative(this.referenceDir, filepath);
				console.error(`generating ${repr(relPath)}...`);

				let params = Object.assign({}, page, { slug: this.slug });
				let stream = new File(filepath);
				return new Promise(resolve => {
					render(viewName, params, stream, { fragment: false }, _ => {
						stream.close();
						resolve();
					});
				});
			});
	}

	parse(pageIndex) {
		return colonParse(this.source).
			then(({ headers, body }) => ({
				meta: headers,
				html: this.transform(body, headers, pageIndex)
			}));
	}
};
