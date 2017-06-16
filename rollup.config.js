/* eslint-env node */
"use strict";

let generateConfig = require("complate-jsx/bundling");

module.exports = generateConfig("./views/index.jsx", "./dist/bundle.js", {
	extensions: [".jsx"],
	moduleName: "render",
	format: "cjs"
});
