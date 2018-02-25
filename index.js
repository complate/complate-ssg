"use strict";

let fs = require("fs");
let path = require("path");

module.exports = (rootDir, bundlePath, { targetDir = rootDir } = {}) => {
	bundlePath = path.resolve(rootDir, bundlePath);
	let render = require(bundlePath);

	return function generatePage(filepath, view, params) {
		filepath = path.resolve(targetDir, filepath);
		console.error(`generating \`${path.relative(rootDir, filepath)}\`...`);

		let fh = new WritableStream(filepath);
		render(view, params, fh, { fragment: false }, _ => {
			fh.close();
		});
	};
};

class WritableStream {
	constructor(filepath) {
		this._stream = fs.createWriteStream(filepath);
	}

	writeln(msg) {
		this.write(`${msg}\n`);
	}

	write(msg) {
		this._stream.write(msg);
	}

	flush() {
		// no-op
	}

	close() {
		this._stream.end();
	}
}
