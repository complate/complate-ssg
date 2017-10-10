import Renderer, { createElement } from "complate-stream";

let renderer = new Renderer("<!DOCTYPE html>");

export default renderer.renderView.bind(renderer);

renderer.registerView(function SiteIndex({ title }) {
	return <DefaultLayout title={title}>
		<h1>{title}</h1>
	</DefaultLayout>;
});

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
