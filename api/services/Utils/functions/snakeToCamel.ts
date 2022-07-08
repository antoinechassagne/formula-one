// @ts-nocheck
function snakeToCamelCase(str) {
  if (!str || typeof str !== "string") return str;
  return str.replace(/(_\w)/g, match => match[1].toUpperCase());
}

module.exports = snakeToCamelCase;
