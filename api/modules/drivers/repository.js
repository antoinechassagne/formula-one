const database = require("../../database");
const {
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");
const { uniqueBy } = require("../../services/Utils");
const mapping = require("./mapping");

const NUMBER_OF_DRIVERS_PER_TEAM = 2;

async function getDriver(id) {
  try {
    const where = convertBack({ id }, mapping);
    const rawDriver = await database("drivers").where(where).first();
    const driver = convert(rawDriver, mapping);
    return { data: driver };
  } catch (error) {
    return { error };
  }
}

async function getDrivers(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping);
    const rawDrivers = await database("drivers")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const drivers = convertMany(rawDrivers, mapping);
    return { data: drivers };
  } catch (error) {
    return { error };
  }
}

async function getTeamCurrentDrivers(teamId) {
  try {
    const rawDrivers = await database("results")
      .join("races", { "results.race_id": "races.race_id" })
      .join("drivers", { "results.driver_id": "drivers.driver_id" })
      .where({ "results.constructor_id": teamId })
      .orderBy("date", "desc");

    const uniqueRawDrivers = uniqueBy(rawDrivers, "driver_id");
    const currentRawDrivers = uniqueRawDrivers.slice(
      0,
      NUMBER_OF_DRIVERS_PER_TEAM
    );

    const drivers = convertMany(currentRawDrivers, mapping);
    return { data: drivers };
  } catch (error) {
    return { error };
  }
}

async function getTeamPreviousDrivers(teamId) {
  try {
    const rawDrivers = await database("results")
      .join("races", { "results.race_id": "races.race_id" })
      .join("drivers", { "results.driver_id": "drivers.driver_id" })
      .where({ "results.constructor_id": teamId })
      .orderBy("date", "desc");

    const uniqueRawDrivers = uniqueBy(rawDrivers, "driver_id");
    const currentRawDrivers = uniqueRawDrivers.slice(
      NUMBER_OF_DRIVERS_PER_TEAM
    );

    const drivers = convertMany(currentRawDrivers, mapping);
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
