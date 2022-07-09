/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
// @ts-nocheck
const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.resolve(__dirname, "functions"));

const functions = files.reduce((functions, file) => {
  const [name, extension] = file.split(".");
  /* Exclude test files */
  if (extension === "test") {
    return functions;
  }
  functions[name] = require(`./functions/${file}`);
  return functions;
}, {});

module.exports = functions;
