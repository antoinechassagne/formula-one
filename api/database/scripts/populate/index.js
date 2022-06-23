const path = require("path");
const database = require("../../index");
const Extraction = require("./services/Extraction");
const mapping = require("./mapping");

const extraction = new Extraction(
  path.resolve(__dirname, "../../data"),
  mapping
);

(async function () {
  try {
    for (const tableName of [
      "circuits",
      "teams",
      "drivers",
      "seasons",
      "statuses",
      "races",
      "team_results",
      "team_standings",
      "driver_standings",
      "lap_times",
      "pit_stops",
      "qualifying_results",
      "race_results",
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
    const rows = await extraction.getRows(tableName);
    await database.batchInsert(tableName, rows, 3000);
    console.info(`✅ Table ${tableName} populated.`);
  } catch (error) {
    console.info(`❌ An error occured while populating table ${tableName}.`);
    throw error;
  }
}
