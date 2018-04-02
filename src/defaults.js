"use strict";

exports.contentDir = "./content";
exports.bundle = "./dist/views.js";
exports.viewName = "render";
exports.targetDir = "./dist/site";
exports.transforms = {
	md: (txt, { safe, smart }) => require("./markdown")(txt, { safe, smart })
};
