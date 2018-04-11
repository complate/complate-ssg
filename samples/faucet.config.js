"use strict";

module.exports = {
	js: [{
		source: "./views/index.jsx",
		target: "./dist/views.js",
		fingerprint: false,
		format: "CommonJS",
		exports: "render",
		jsx: { pragma: "createElement" }
	}]
};
