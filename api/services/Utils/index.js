/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.resolve(__dirname, "functions"));

const functions = files.reduce((functions, file) => {
  const [name] = file.split(".");
  functions[name] = require(`./functions/${file}`);
  return functions;
}, {});

module.exports = functions;
