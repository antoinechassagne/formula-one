import path from "path";
import csvtojson from "csvtojson";
import { Entity } from "../../../../types";
import { TableNames } from "../../types";
import { TablesMapping } from "../mapping";

export default class Extraction {
  sourceFilePath: string;

  mapping: TablesMapping;

  constructor(sourceFilePath: string, mapping: TablesMapping) {
    this.sourceFilePath = sourceFilePath;
    this.mapping = mapping;
  }

  async getRows(tableName: TableNames): Promise<Entity[]> {
    const data = (await this.extract(tableName)) || [];
    return data.map(row => this.formatRow(row, tableName));
  }

  extract(tableName: TableNames) {
    const fileName = this.getSourceFileNameForTable(tableName);
    if (!fileName) return null;
    return csvtojson().fromFile(path.resolve(this.sourceFilePath, `${fileName}.csv`));
  }

  formatRow(row: Entity, tableName: TableNames): Entity {
    const mapping = this.mapping.find(table => table.to === tableName);
    if (!mapping) return row;
    return Object.keys(row).reduce((formattedRow, columnName) => {
      const columnMapping = mapping.columns.find(column => column.from === columnName);
      if (columnMapping) {
        formattedRow[columnMapping.to] = columnMapping.with
          ? columnMapping.with(Extraction.cleanColumnValue(row[columnName]))
          : Extraction.cleanColumnValue(row[columnName]);
      } else {
        formattedRow[columnName] = Extraction.cleanColumnValue(row[columnName]);
      }
      return formattedRow;
    }, {} as Entity);
  }

  static cleanColumnValue(value: any) {
    return value === "\\N" ? null : value;
  }

  getSourceFileNameForTable(tableName: TableNames) {
    return this.mapping.find(table => table.to === tableName)?.from || null;
  }
}
