const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");
const { uniqueBy } = require("../../services/Utils");

const NUMBER_OF_DRIVERS_PER_TEAM = 2;

async function getDriver(id) {
  try {
    const where = serialize({ id });
    const rawDriver = await database("drivers").where(where).first();
    const driver = deserialize(rawDriver);
    return { data: driver };
  } catch (error) {
    return { error };
  }
}

async function getDrivers(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawDrivers = await database("drivers")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const drivers = deserializeMany(rawDrivers);
    return { data: drivers };
  } catch (error) {
    return { error };
  }
}

async function getTeamCurrentDrivers(teamId) {
  try {
    const rawDrivers = await database("race_results")
      .join("races", { "race_results.race_id": "races.id" })
      .join("drivers", { "race_results.driver_id": "drivers.id" })
      .where({ "race_results.team_id": teamId })
      .orderBy("date", "desc");
    const uniqueRawDrivers = uniqueBy(rawDrivers, "driver_id");
    const currentRawDrivers = uniqueRawDrivers.slice(0, NUMBER_OF_DRIVERS_PER_TEAM);
    const drivers = deserializeMany(currentRawDrivers);
    return { data: drivers };
  } catch (error) {
    return { error };
  }
}

async function getTeamPreviousDrivers(teamId) {
  try {
    const rawDrivers = await database("race_results")
      .join("races", { "race_results.race_id": "races.id" })
      .join("drivers", { "race_results.driver_id": "drivers.id" })
      .where({ "race_results.team_id": teamId })
      .orderBy("date", "desc");
    const uniqueRawDrivers = uniqueBy(rawDrivers, "driver_id");
    const currentRawDrivers = uniqueRawDrivers.slice(NUMBER_OF_DRIVERS_PER_TEAM);
    const drivers = deserializeMany(currentRawDrivers);
    return { data: drivers };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getDriver,
  getDrivers,
  getTeamCurrentDrivers,
  getTeamPreviousDrivers
};
