"use strict";

let fs = require("fs");

module.exports = class File {
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
};
