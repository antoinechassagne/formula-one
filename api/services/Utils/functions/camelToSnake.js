function camelToSnake(str) {
  return str
    .replace(/([A-Z])/g, (_, group) => `_${group.toLowerCase()}`)
    .replace(/^_/, "");
}

module.exports = camelToSnake;
