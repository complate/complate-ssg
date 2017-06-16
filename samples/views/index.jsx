import renderer, { registerMacro, createElement } from "complate-stream";

registerMacro("site-index", ({ title }) => {
	return <default-layout title={title}>
		<h1>{title}</h1>
	</default-layout>;
});

registerMacro("default-layout", (params, ...children) => <html>
	<head>
		<meta charset="utf-8" />
		<title>{params.title}</title>
	</head>

	<body>
		{children}
	</body>
</html>);

export default renderer("<!DOCTYPE html>");
