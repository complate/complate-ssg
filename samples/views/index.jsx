import renderer, { createElement } from "complate-stream";

let { renderView, registerView } = renderer("<!DOCTYPE html>");

export default renderView;

registerView(function SiteIndex({ title }) {
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
