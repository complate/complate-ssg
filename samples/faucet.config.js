module.exports = {
	js: [{
		source: "./views/index.jsx",
		target: "./dist/bundle.js",
		format: "cjs",
		moduleName: "render",
		esnext: true,
		jsx: { pragma: "createElement" }
	}]
};
