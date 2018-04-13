"use strict";

exports.abort = (msg, code = 1) => {
	console.error(msg);
	process.exit(code);
};

// simplistic imitation of Node 8's `util.promisify`
// NB: only supports a single callback parameter
exports.promisify = fn => {
	return (...args) => new Promise((resolve, reject) => {
		fn(...args, (err, res) => {
			if(err) {
				reject(err);
				return;
			}
			resolve(res);
		});
	});
};

exports.repr = value => `\`${value}\``;
