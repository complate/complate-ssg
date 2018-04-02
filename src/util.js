"use strict";

exports.abort = (msg, code = 1) => {
	console.error(msg);
	process.exit(code);
};

// poor man's version of Node's `util.promisify` (available since v8.0.0)
exports.promisify = fn => {
	return (...args) => {
		return new Promise((resolve, reject) => {
			fn(...args, (err, res) => {
				if(err) {
					reject(err);
					return;
				}
				resolve(res);
			});
		});
	};
};

exports.repr = value => `\`${value}\``;
