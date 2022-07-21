/* eslint-disable no-console */
import path from "path";
import database from "../../index";
import { getRowsToInsert, updateTablesTracking } from "./services/TablesTracking";
import Extraction from "./services/Extraction";
import mapping from "./mapping";
import { TableNames } from "../types";

const extraction = new Extraction(path.resolve(__dirname, "../../data"), mapping);

(async function () {
  try {
    for (const tableName of [
      TableNames.circuits,
      TableNames.teams,
      TableNames.drivers,
      TableNames.seasons,
      TableNames.statuses,
      TableNames.races,
      TableNames.teamResults,
      TableNames.teamStandings,
      TableNames.driverStandings,
      TableNames.lapTimes,
      TableNames.pitStops,
      TableNames.qualifyingResults,
      TableNames.raceResults,
      TableNames.sprintResults
    ]) {
      await populateTable(tableName);
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();

async function populateTable(tableName: TableNames) {
  console.info(`⌛ Populating table ${tableName}...`);
  try {
    const rows = await extraction.getRows(tableName);
    const rowsToInsert = await getRowsToInsert(tableName, rows);
    const ids = await database.batchInsert(tableName, rowsToInsert, 3000).returning("id");
    await updateTablesTracking(tableName, ids);
    console.info(`✅ Table ${tableName} populated with ${rowsToInsert.length} rows.`);
  } catch (error) {
    console.info(`❌ An error occured while populating table ${tableName}.`);
    throw error;
  }
}
