"use strict";

let commonmark = require("commonmark");

module.exports = function renderMarkdown(txt,
		{ safe = true, smart = true, resolveURI } = {}) {
	let reader = new commonmark.Parser({ smart });
	let parsed = reader.parse(txt);
	if(resolveURI) {
		transformLinks(parsed, resolveURI);
	}

	let writer = new commonmark.HtmlRenderer({ safe });
	return writer.render(parsed);
};

function transformLinks(parsed, resolveURI) {
	let walker = parsed.walker();
	let event = walker.next();
	while(event) {
		let node = event.node;
		if(event.entering && node.type === "link") {
			node.destination = resolveURI(node.destination);
		}
		event = walker.next();
	}
}
