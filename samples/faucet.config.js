"use strict";

module.exports = {
	js: [{
		source: "./views/index.jsx",
		target: "./dist/views.js",
		format: "cjs",
		moduleName: "render",
		jsx: { pragma: "createElement" }
	}]
};
