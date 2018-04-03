complate-ssg
============

static-site generator for [complate](https://complate.org)

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

The easiest way is to start from the samples (e.g. by copying
`node_modules/complate-ssg/samples`):

* complate is used to generate a views bundle for rendering HTML – we recommend
  using [faucet-pipeline](http://faucet-pipeline.org) to compile JSX
* complate-ssg uses these views to generate HTML pages from Markdown files
