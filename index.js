"use strict";

let fs = require("fs");
let path = require("path");

let render = require(path.resolve("./dist/bundle.js")); // TODO: configurable

module.exports = function generatePage(filepath, entryPoint, data) {
	filepath = path.resolve(filepath);
	console.log(`generating \`${filepath}\`...`); // eslint-disable-line no-console

	let fh = new WritableStream(filepath);
	render(fh, entryPoint, data);
	fh.close();
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
