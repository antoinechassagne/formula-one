const database = require("../index");

(async function () {
  try {
    for (const tableName of [
      "sprint_results",
      "results",
      "qualifying",
      "pit_stops",
      "lap_times",
      "driver_standings",
      "constructor_standings",
      "constructor_results",
      "races",
      "status",
      "seasons",
      "drivers",
      "constructors",
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
