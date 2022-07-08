// @ts-nocheck
const database = require("../../../index");

async function getRowsToInsert(tableName, rows) {
  const [tracking] = await database("tables_tracking").where({
    table_name: tableName
  });
  if (!tracking) return rows;
  return rows.filter(row => parseInt(row.id, 10) > tracking.last_id_inserted);
}

function updateTablesTracking(tableName, ids) {
  if (!ids.length) return;
  database("tables_tracking")
    .insert({
      table_name: tableName,
      last_id_inserted: ids[ids.length - 1]
    })
    .onConflict("table_name")
    .merge();
}

module.exports = { getRowsToInsert, updateTablesTracking };
