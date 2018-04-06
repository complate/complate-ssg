complate-ssg
============

static-site generator for [complate](https://complate.org), creating HTML pages
from Markdown and other formats

[![package version](https://img.shields.io/npm/v/complate-ssg.svg?style=flat)](https://www.npmjs.com/package/complate-ssg)
[![build status](https://travis-ci.org/complate/complate-stream.svg?branch=master)](https://travis-ci.org/complate/complate-ssg)
[![Greenkeeper badge](https://badges.greenkeeper.io/complate/complate-ssg.svg)](https://greenkeeper.io)


Getting Started
---------------

```
$ npm install complate-ssg
```

```
$ complate-ssg [options] [content_directory [target_directory]]
```

(See `complate-ssh -h` for a list of options.)

Source files (see [Source Content](#source-content) below) reside in the content
directory, resulting HTML files will be created in the target directory.

The easiest way is to start from the samples (e.g. by copying
`node_modules/complate-ssg/samples`):

* complate is used to generate a views bundle for rendering HTML – we recommend
  using [faucet-pipeline](http://faucet-pipeline.org) to compile JSX
* complate-ssg uses these views to generate HTML pages from Markdown files


Source Content
--------------

Out of the box, complate-ssg treats `.md` files as
[Markdown](http://commonmark.org/help/). For additional formats, see
[Customization](#customization) below.

Each file must contain a metadata preamble (AKA front matter) at the top,
separated by a blank line:

```markdown
title: Hello World

lorem ipsum

* foo
* bar

dolor sit amet
```


Customization
-------------

Rendering of source content can be customized via the imperative API – e.g. for
additional file extensions, formats or to adjust link URIs.

Let's create a file `ssg.js`:

```javascript
let ssg = require("complate-ssg");
let markdown = require("complate-ssg/src/markdown");

// all arguments are optional; defaults are shown below
let referenceDir = __dirname;
let options = { // all entries are optional
    transforms: {
        md: (source, metadata) => markdown(source)
    }
};
ssg(referenceDir, options);
```

The built-in Markdown module supports influencing link targets, e.g. to remove
the `.html` file extension for internal links:

```javascript
options.transforms = {
    html: (source, metadata, pages) => markdown(source, {
        resolveURI: uri => {
            if(pages.has(uri)) {
                return uri.replace(".html", "");
            }
            return uri;
        }
    })
};
```

If we want to support a different file extension, we need to add an entry to
`options.transforms`:

```javascript
options.transforms = {
    txt: (source, metadata) => source
};
```

This will add support for `.txt` files in the content directory, passing
contents through unmodified. (Note that these files also require a metadata
preamble, even though it's unused here.)

We might also want to support other formats, e.g.
[AsciiDoc](https://asciidoctor.org) – in which case we'd have to find some
library to generate HTML from `.adoc` sources:

```javascript
options.transforms = {
    adoc: (source, metadata) => asciidoc(source, { layout: metadata.layout })
};
```

Here's a list of complate-ssg's default values for reference:

```javascript
let referenceDir = process.cwd();
let options = {
    content: "./content",
    target: "./dist/site",
    views: {
        bundle: "./dist/views.js",
        name: "render"
    },
    transforms: {
        md: (source, metadata) => markdown(source, {
            // if true, this activates typographic enhancements like smart
            // quotes, dashes and ellipses
            smart: metadata.smart,
            // if true, this disallows raw HTML in Markdown sources
            safe: metadata.safe
        })
    }
};
```
