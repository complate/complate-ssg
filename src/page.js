"use strict";

let File = require("./stream");
let { repr } = require("./util");
let colonParse = require("metacolon");
let path = require("path");

module.exports = class Page {
	constructor(filepath, extension, referenceDir, transform) {
		this.filepath = filepath;
		this.extension = extension;
		this.referenceDir = referenceDir;
		this.transform = transform;
	}

	// writes HTML to disk via complate rendering
	render(targetDir, viewName, render) {
		this.parse().
			then(page => {
				let filepath = path.resolve(targetDir, `${page.slug}.html`);
				let relPath = path.relative(this.referenceDir, filepath);
				console.error(`generating ${repr(relPath)}...`);

				let stream = new File(filepath);
				return new Promise(resolve => {
					render(viewName, page, stream, { fragment: false }, _ => {
						stream.close();
						resolve();
					});
				});
			});
	}

	parse() {
		let { filepath } = this;
		let filename = path.basename(filepath);
		return colonParse(filepath).
			then(({ headers, body }) => ({
				slug: filename.substr(0, filename.length - this.extension.length - 1),
				meta: headers,
				html: this.transform(body, headers)
			}));
	}
};
