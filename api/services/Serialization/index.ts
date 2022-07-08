// @ts-nocheck
const { snakeToCamel, camelToSnake } = require("../Utils");

function serialize(obj) {
  if (!obj) return obj;
  return Object.keys(obj).reduce((mappedData, key) => {
    mappedData[camelToSnake(key)] = obj[key];
    return mappedData;
  }, {});
}

function deserialize(obj) {
  if (!obj) return obj;
  return Object.keys(obj).reduce((mappedData, key) => {
    mappedData[snakeToCamel(key)] = obj[key];
    return mappedData;
  }, {});
}

function deserializeMany(items) {
  if (!items) return [];
  return items.map(item => deserialize(item));
}

module.exports = { serialize, deserialize, deserializeMany };
