const path = require("path");
const csvtojson = require("csvtojson");

async function extract(tableName) {
  return csvtojson().fromFile(
    path.resolve(__dirname, "../../data", `${tableName}.csv`)
  );
}

function formatRow(row, mapping) {
  return Object.keys(row).reduce((formattedRow, column) => {
    if (mapping[column]) {
      formattedRow[mapping[column]] = cleanValue(row[column]);
    } else {
      formattedRow[column] = cleanValue(row[column]);
    }
    return formattedRow;
  }, {});
}

function cleanValue(value) {
  return value === "\\N" ? null : value;
}

module.exports = { extract, formatRow };
