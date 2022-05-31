const mapping = require("./mapping");

function convertMany(data, mapping) {
  if (!data) return [];
  return data.map(item => convert(item, mapping));
}

function convert(data, mapping) {
  if (!mapping) return data;
  return Object.keys(data).reduce((mappedData, key) => {
    if (mapping[key]) {
      mappedData[mapping[key]] = data[key];
    } else {
      mappedData[key] = data[key];
    }
    return mappedData;
  }, {});
}

function convertBack(data, mapping) {
  if (!mapping) return data;
  return Object.keys(data).reduce((mappedData, key) => {
    const targetKey = Object.keys(mapping).find(mappingkey => {
      return mapping[mappingkey] === key;
    });
    if (targetKey) {
      mappedData[targetKey] = data[key];
    } else {
      mappedData[key] = data[key];
    }
    return mappedData;
  }, {});
}

module.exports = { mapping, convert, convertBack, convertMany };
