const NULL_VALUE = "N";

function convertMany(data, mapping) {
  if (!data) return [];
  return data.map(item => convert(item, mapping));
}

function convert(data, mapping) {
  if (!data) return null;
  return mapping.reduce((result, { from, to, fn }) => {
    if (!data[from] || data[from] === NULL_VALUE) return result;
    result[to] = fn ? fn(data[from]) : data[from];
    return result;
  }, {});
}

module.exports = { convert, convertMany };
