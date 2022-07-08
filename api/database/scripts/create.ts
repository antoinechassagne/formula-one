/* eslint-disable no-console */
// @ts-nocheck
const database = require("../index");

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
  console.info(`⌛ Creating table tables_tracking...`);
  try {
    await database.schema.createTable("tables_tracking", table => {
      table.increments("id").primary();
      table.string("table_name").unique();
      table.integer("last_id_inserted");
    });
    console.info("✅ Table tables_tracking created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table tables_tracking.`);
    throw error;
  }
}

async function createCircuitsTable() {
  console.info(`⌛ Creating table circuits...`);
  try {
    await database.schema.createTable("circuits", table => {
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
    console.info("✅ Table circuits created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table circuits.`);
    throw error;
  }
}

async function createTeamsTable() {
  console.info(`⌛ Creating table teams...`);
  try {
    await database.schema.createTable("teams", table => {
      table.increments("id").primary();
      table.string("ref");
      table.string("name");
      table.string("nationality");
      table.string("url");
    });
    console.info("✅ Table teams created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table teams.`);
    throw error;
  }
}

async function createDriversTable() {
  console.info(`⌛ Creating table drivers...`);
  try {
    await database.schema.createTable("drivers", table => {
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
    console.info("✅ Table drivers created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table drivers.`);
    throw error;
  }
}

async function createSeasonsTable() {
  console.info(`⌛ Creating table seasons...`);
  try {
    await database.schema.createTable("seasons", table => {
      table.increments("id").primary();
      table.integer("year");
      table.string("url");
    });
    console.info("✅ Table seasons created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table seasons.`);
    throw error;
  }
}

async function createStatusesTable() {
  console.info(`⌛ Creating table statuses...`);
  try {
    await database.schema.createTable("statuses", table => {
      table.increments("id").primary();
      table.string("label");
    });
    console.info("✅ Table statuses created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table statuses.`);
    throw error;
  }
}

async function createRacesTable() {
  console.info(`⌛ Creating table races...`);
  try {
    await database.schema.createTable("races", table => {
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
    console.info("✅ Table races created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table races.`);
    throw error;
  }
}

async function createTeamResultsTable() {
  console.info(`⌛ Creating table team_results...`);
  try {
    await database.schema.createTable("team_results", table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("team_id").references("id").inTable("teams");
      table.float("points");
      table.boolean("disqualified");
    });
    console.info("✅ Table team_results created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table team_results.`);
    throw error;
  }
}

async function createTeamStandingsTable() {
  console.info(`⌛ Creating table team_standings...`);
  try {
    await database.schema.createTable("team_standings", table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("team_id").references("id").inTable("teams");
      table.float("points");
      table.integer("position");
      table.string("position_text");
      table.integer("wins");
    });
    console.info("✅ Table team_standings created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table team_standings.`);
    throw error;
  }
}

async function createDriverStandingsTable() {
  console.info(`⌛ Creating table driver_standings...`);
  try {
    await database.schema.createTable("driver_standings", table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.float("points");
      table.integer("position");
      table.string("position_text");
      table.integer("wins");
    });
    console.info("✅ Table driver_standings created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table driver_standings.`);
    throw error;
  }
}

async function createLapTimesTable() {
  console.info(`⌛ Creating table lap_times...`);
  try {
    await database.schema.createTable("lap_times", table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.integer("lap");
      table.integer("position");
      table.string("time");
      table.integer("milliseconds");
    });
    console.info("✅ Table lap_times created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table lap_times.`);
    throw error;
  }
}

async function createPitStopsTable() {
  console.info(`⌛ Creating table pit_stops...`);
  try {
    await database.schema.createTable("pit_stops", table => {
      table.increments("id").primary();
      table.integer("race_id").references("id").inTable("races");
      table.integer("driver_id").references("id").inTable("drivers");
      table.integer("stop");
      table.integer("lap");
      table.string("time");
      table.string("duration");
      table.integer("milliseconds");
    });
    console.info("✅ Table pit_stops created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table pit_stops.`);
    throw error;
  }
}

async function createQualifyingResultsTable() {
  console.info(`⌛ Creating table qualifying_results...`);
  try {
    await database.schema.createTable("qualifying_results", table => {
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
    console.info("✅ Table qualifying_results created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table qualifying_results.`);
    throw error;
  }
}

async function createRaceResultsTable() {
  console.info(`⌛ Creating table race_results...`);
  try {
    await database.schema.createTable("race_results", table => {
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
    console.info("✅ Table race_results created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table race_results.`);
    throw error;
  }
}

async function createSprintResultsTable() {
  console.info(`⌛ Creating table sprint_results...`);
  try {
    await database.schema.createTable("sprint_results", table => {
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
    console.info("✅ Table sprint_results created.");
  } catch (error) {
    console.info(`❌ An error occured while creating table sprint_results.`);
    throw error;
  }
}
