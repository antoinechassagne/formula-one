import database from "../../../index";
import { Entity } from "../../../../types";
import { TableNames } from "../../types";

export async function getRowsToInsert(tableName: TableNames, rows: Entity[]) {
  const [tracking] = await database("tables_tracking").where({
    table_name: tableName
  });
  if (!tracking) return rows;
  return rows.filter(row => parseInt(row.id, 10) > tracking.last_id_inserted);
}

export function updateTablesTracking(tableName: TableNames, ids: string[]) {
  if (!ids.length) return;
  database("tables_tracking")
    .insert({
      table_name: tableName,
      last_id_inserted: ids[ids.length - 1]
    })
    .onConflict("table_name")
    .merge();
}
