const database = require("../index");

(async function () {
  try {
    for (const tableName of [
      "sprint_results",
      "results",
      "qualifying_results",
      "pit_stops",
      "lap_times",
      "driver_standings",
      "team_standings",
      "team_results",
      "races",
      "statuses",
      "seasons",
      "drivers",
      "teams",
      "circuits"
    ]) {
      await dropTable(tableName);
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();

async function dropTable(tableName) {
  try {
    const exists = await database.schema.hasTable(tableName);
    if (exists) {
      console.log(`⌛ Dropping table ${tableName}...`);
      await database.schema.dropTable(tableName);
      console.info(`✅ Table ${tableName} dropped.`);
      return;
    }
    console.log(`⚠️ Table ${tableName} does not exist.`);
  } catch (error) {
    console.info(`❌ An error occured while dropping table ${tableName}.`);
    throw error;
  }
}
