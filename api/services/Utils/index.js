function uniqueBy(array, property) {
  return [...new Map(array.map(item => [item[property], item])).values()];
}

module.exports = { uniqueBy };
