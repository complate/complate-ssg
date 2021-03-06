"use strict";

module.exports = {
	watchDirs: ["./views"],
	js: [{
		source: "./views/index.jsx",
		target: "./dist/views.js",
		fingerprint: false,
		format: "CommonJS",
		jsx: { pragma: "createElement" }
	}]
};
