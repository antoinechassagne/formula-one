/* eslint-disable no-console */
import database from "../index";
import { TableNames } from "./types";

(async function () {
  try {
    await createTablesTrackingTable();
    await createCircuitsTable();
    await createTeamsTable();
    await createDriversTable();
    await createSeasonsTable();
    await createStatusesTable();
    await createRacesTable();
    await createTeamResultsTable();
    await createTeamStandingsTable();
    await createDriverStandingsTable();
    await createLapTimesTable();
    await createPitStopsTable();
    await createQualifyingResultsTable();
    await createRaceResultsTable();
    await createSprintResultsTable();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();

async function createTablesTrackingTable() {
  console.info(`⌛ Creating table ${TableNames.tablesTracking}...`);
  try {
    await database.schema.createTable(TableNames.tablesTracking, table => {
      table.increments("id").primary();
      table.string("table_name").unique();
      table.integer("last_id_inserted");
    });
    console.info(`✅ Table ${TableNames.tablesTracking} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.tablesTracking}.`);
    throw error;
  }
}

async function createCircuitsTable() {
  console.info(`⌛ Creating table ${TableNames.circuits}...`);
  try {
    await database.schema.createTable(TableNames.circuits, table => {
      table.increments("id").primary();
      table.string("ref");
      table.string("name");
      table.string("location");
      table.string("country");
      table.float("latitude", 8, 6);
      table.float("longitude", 9, 6);
      table.integer("altitude");
      table.string("url");
    });
    console.info(`✅ Table ${TableNames.circuits} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.circuits}.`);
    throw error;
  }
}

async function createTeamsTable() {
  console.info(`⌛ Creating table ${TableNames.teams}...`);
  try {
    await database.schema.createTable(TableNames.teams, table => {
      table.increments("id").primary();
      table.string("ref");
      table.string("name");
      table.string("nationality");
      table.string("url");
    });
    console.info(`✅ Table ${TableNames.teams} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.teams}.`);
    throw error;
  }
}

async function createDriversTable() {
  console.info(`⌛ Creating table ${TableNames.drivers}...`);
  try {
    await database.schema.createTable(TableNames.drivers, table => {
      table.increments("id").primary();
      table.string("ref");
      table.integer("number");
      table.string("code");
      table.string("first_name");
      table.string("last_name");
      table.string("birthdate");
      table.string("nationality");
      table.string("url");
    });
    console.info(`✅ Table ${TableNames.drivers} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.drivers}.`);
    throw error;
  }
}

async function createSeasonsTable() {
  console.info(`⌛ Creating table ${TableNames.seasons}...`);
  try {
    await database.schema.createTable(TableNames.seasons, table => {
      table.increments("id").primary();
      table.integer("year");
      table.string("url");
    });
    console.info(`✅ Table ${TableNames.seasons} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.seasons}.`);
    throw error;
  }
}

async function createStatusesTable() {
  console.info(`⌛ Creating table ${TableNames.statuses}...`);
  try {
    await database.schema.createTable(TableNames.statuses, table => {
      table.increments("id").primary();
      table.string("label");
    });
    console.info(`✅ Table ${TableNames.statuses} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.statuses}.`);
    throw error;
  }
}

async function createRacesTable() {
  console.info(`⌛ Creating table ${TableNames.races}...`);
  try {
    await database.schema.createTable(TableNames.races, table => {
      table.increments("id").primary();
      table.integer("year");
      table.integer("round");
      table.integer("circuit_id").references("id").inTable("circuits");
      table.string("name");
      table.string("date");
      table.string("time");
      table.string("url");
      table.string("fp1_date");
      table.string("fp1_time");
      table.string("fp2_date");
      table.string("fp2_time");
      table.string("fp3_date");
      table.string("fp3_time");
      table.string("qualifiying_date");
      table.string("qualifiying_time");
      table.string("sprint_date");
      table.string("sprint_time");
    });
    console.info(`✅ Table ${TableNames.races} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.races}.`);
    throw error;
  }
}

async function createTeamResultsTable() {
  console.info(`⌛ Creating table ${TableNames.teamResults}...`);
  try {
    await database.schema.createTable(TableNames.teamResults, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("team_id").references("id").inTable("teams");
      table.float("points");
      table.boolean("disqualified");
    });
    console.info(`✅ Table ${TableNames.teamResults} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.teamResults}.`);
    throw error;
  }
}

async function createTeamStandingsTable() {
  console.info(`⌛ Creating table ${TableNames.teamStandings}...`);
  try {
    await database.schema.createTable(TableNames.teamStandings, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("team_id").references("id").inTable("teams");
      table.float("points");
      table.integer("position");
      table.string("position_text");
      table.integer("wins");
    });
    console.info(`✅ Table ${TableNames.teamStandings} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.teamStandings}.`);
    throw error;
  }
}

async function createDriverStandingsTable() {
  console.info(`⌛ Creating table ${TableNames.driverStandings}...`);
  try {
    await database.schema.createTable(TableNames.driverStandings, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.float("points");
      table.integer("position");
      table.string("position_text");
      table.integer("wins");
    });
    console.info(`✅ Table ${TableNames.driverStandings} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.driverStandings}.`);
    throw error;
  }
}

async function createLapTimesTable() {
  console.info(`⌛ Creating table ${TableNames.lapTimes}...`);
  try {
    await database.schema.createTable(TableNames.lapTimes, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.integer("lap");
      table.integer("position");
      table.string("time");
      table.integer("milliseconds");
    });
    console.info(`✅ Table ${TableNames.lapTimes} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.lapTimes}.`);
    throw error;
  }
}

async function createPitStopsTable() {
  console.info(`⌛ Creating table ${TableNames.pitStops}...`);
  try {
    await database.schema.createTable(TableNames.pitStops, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.integer("stop");
      table.integer("lap");
      table.string("time");
      table.string("duration");
      table.integer("milliseconds");
    });
    console.info(`✅ Table ${TableNames.pitStops} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.pitStops}.`);
    throw error;
  }
}

async function createQualifyingResultsTable() {
  console.info(`⌛ Creating table ${TableNames.qualifyingResults}...`);
  try {
    await database.schema.createTable(TableNames.qualifyingResults, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.integer("team_id").references("id").inTable("teams");
      table.integer("number");
      table.integer("position");
      table.string("q1");
      table.string("q2");
      table.string("q3");
    });
    console.info(`✅ Table ${TableNames.qualifyingResults} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.qualifyingResults}.`);
    throw error;
  }
}

async function createRaceResultsTable() {
  console.info(`⌛ Creating table ${TableNames.raceResults}...`);
  try {
    await database.schema.createTable(TableNames.raceResults, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.integer("team_id").references("id").inTable("teams");
      table.integer("number");
      table.integer("grid");
      table.integer("position");
      table.string("position_text");
      table.integer("position_order");
      table.float("points");
      table.integer("laps");
      table.string("time");
      table.integer("milliseconds");
      table.integer("fastest_lap");
      table.integer("rank");
      table.string("fastest_lap_time");
      table.float("fastest_lap_speed");
      table.integer("status_id").references("id").inTable("statuses");
    });
    console.info(`✅ Table ${TableNames.raceResults} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.raceResults}.`);
    throw error;
  }
}

async function createSprintResultsTable() {
  console.info(`⌛ Creating table ${TableNames.sprintResults}...`);
  try {
    await database.schema.createTable(TableNames.sprintResults, table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.integer("team_id").references("id").inTable("teams");
      table.integer("number");
      table.integer("grid");
      table.integer("position");
      table.string("position_text");
      table.integer("position_order");
      table.float("points");
      table.integer("laps");
      table.string("time");
      table.integer("milliseconds");
      table.integer("fastest_lap");
      table.string("fastest_lap_time");
      table.integer("status_id").references("id").inTable("statuses");
    });
    console.info(`✅ Table ${TableNames.sprintResults} created.`);
  } catch (error) {
    console.info(`❌ An error occured while creating table ${TableNames.sprintResults}.`);
    throw error;
  }
}
