import Renderer, { createElement, safe } from "complate-stream";

let { registerView, renderView } = new Renderer();

registerView(render);

export default renderView;

function render({ slug, meta, html }) {
	return <DefaultLayout title={meta.title}>
		{safe(html)}
	</DefaultLayout>;
}

function DefaultLayout({ title }, ...children) {
	return <html>
		<head>
			<meta charset="utf-8" />
			<title>{title}</title>
		</head>

		<body>
			{children}
		</body>
	</html>;
}
