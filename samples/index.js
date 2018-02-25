"use strict";

let generator = require("complate-ssg");

let generatePage = generator(__dirname, "./dist/views.js");

generatePage("index.html", "SiteIndex", { title: "Hello World" });
