const database = require("../../index");
const { extract, formatRow } = require("./helpers");
const mapping = require("./mapping");

(async function () {
  try {
    for (const tableName of [
      "circuits",
      "constructors",
      "drivers",
      "seasons",
      "status",
      "races",
      "constructor_results",
      "constructor_standings",
      "driver_standings",
      "lap_times",
      "pit_stops",
      "qualifying",
      "results",
      "sprint_results"
    ]) {
      await populateTable(tableName);
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();

async function populateTable(tableName) {
  console.info(`⌛ Populating table ${tableName}...`);
  try {
    const data = await extract(tableName);
    const rows = data.map(row => formatRow(row, mapping[tableName]));
    await database.batchInsert(tableName, rows, 3000);
    console.info(`✅ Table ${tableName} populated.`);
  } catch (error) {
    console.info(`❌ An error occured while populating table ${tableName}.`);
    throw error;
  }
}
