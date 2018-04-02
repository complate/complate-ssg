"use strict";

let commonmark = require("commonmark");

module.exports = function renderMarkdown(txt, { safe = true, smart = true }) {
	let reader = new commonmark.Parser({ smart });
	let parsed = reader.parse(txt);

	let writer = new commonmark.HtmlRenderer({ safe });
	return writer.render(parsed);
};
