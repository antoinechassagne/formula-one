/* eslint-disable no-console */
import database from "../index";
import { TableNames } from "./types";

(async function () {
  try {
    for (const tableName of [
      TableNames.sprintResults,
      TableNames.raceResults,
      TableNames.qualifyingResults,
      TableNames.pitStops,
      TableNames.lapTimes,
      TableNames.driverStandings,
      TableNames.teamStandings,
      TableNames.teamResults,
      TableNames.races,
      TableNames.statuses,
      TableNames.seasons,
      TableNames.drivers,
      TableNames.teams,
      TableNames.circuits,
      TableNames.tablesTracking
    ]) {
      await dropTable(tableName);
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();

async function dropTable(tableName: TableNames) {
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
