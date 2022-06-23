function snakeToCamelCase(str) {
  return str.replace(/(\_\w)/g, match => match[1].toUpperCase());
}

module.exports = snakeToCamelCase;
