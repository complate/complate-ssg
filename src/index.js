#!/usr/bin/env node
"use strict";

let WritableStream = require("./writable_stream");
let render = require("../dist/bundle");

render(new WritableStream(process.stdout), "site-index", { title: "Hello World" });
