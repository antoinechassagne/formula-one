function camelToSnake(str) {
  if (!str || typeof str !== "string") {
    return str;
  }
  return str.replace(/([A-Z])/g, (_, group) => `_${group.toLowerCase()}`).replace(/^_/, "");
}

module.exports = camelToSnake;
