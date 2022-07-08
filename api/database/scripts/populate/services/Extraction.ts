// @ts-nocheck
const path = require("path");
const csvtojson = require("csvtojson");

class Extraction {
  constructor(sourceFilePath, mapping) {
    this.sourceFilePath = sourceFilePath;
    this.mapping = mapping;
  }

  async getRows(tableName) {
    const data = await this.extract(tableName);
    return data.map(row => this.formatRow(row, tableName));
  }

  static extract(tableName) {
    const fileName = this.getSourceFileNameForTable(tableName);
    if (!fileName) return null;
    return csvtojson().fromFile(path.resolve(this.sourceFilePath, `${fileName}.csv`));
  }

  static formatRow(row, tableName) {
    const mapping = this.mapping.find(table => table.to === tableName);
    if (!mapping) return row;
    return Object.keys(row).reduce((formattedRow, columnName) => {
      const columnMapping = mapping.columns.find(column => column.from === columnName);
      if (columnMapping) {
        formattedRow[columnMapping.to] = columnMapping.with
          ? columnMapping.with(this.cleanColumnValue(row[columnName]))
          : this.cleanColumnValue(row[columnName]);
      } else {
        formattedRow[columnName] = this.cleanColumnValue(row[columnName]);
      }
      return formattedRow;
    }, {});
  }

  static cleanColumnValue(value) {
    return value === "\\N" ? null : value;
  }

  static getSourceFileNameForTable(tableName) {
    return this.mapping.find(table => table.to === tableName)?.from || null;
  }
}

module.exports = Extraction;
