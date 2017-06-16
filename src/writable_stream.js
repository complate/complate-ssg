"use strict";

module.exports = class WritableStream {
	constructor(stream) {
		this._stream = stream;
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
};
