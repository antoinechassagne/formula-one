const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");
const { uniqueBy } = require("../../services/Utils");

async function getTeam(id) {
  try {
    const where = convertBack({ id }, mapping.teams);
    const rawTeam = await database("constructors").where(where).first();
    const team = convert(rawTeam, mapping.teams);
    return { data: team };
  } catch (error) {
    return { error };
  }
}

async function getTeams(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.teams);
    const rawTeams = await database("constructors")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const teams = convertMany(rawTeams, mapping.teams);
    return { data: teams };
  } catch (error) {
    return { error };
  }
}

async function getDriverCurrentTeam(driverId) {
  try {
    const rawTeam = await database("results")
      .join("races", { "results.race_id": "races.race_id" })
      .join("drivers", { "results.driver_id": "drivers.driver_id" })
      .join("constructors", {
        "results.constructor_id": "constructors.constructor_id"
      })
      .where({ "results.driver_id": driverId })
      .orderBy("date", "desc")
      .first();
    const team = convert(rawTeam, mapping.teams);
    return { data: team };
  } catch (error) {
    return { error };
  }
}

async function getDriverPreviousTeams(driverId) {
  try {
    const rawTeams = await database("results")
      .join("races", { "results.race_id": "races.race_id" })
      .join("drivers", { "results.driver_id": "drivers.driver_id" })
      .join("constructors", {
        "results.constructor_id": "constructors.constructor_id"
      })
      .where({ "results.driver_id": driverId })
      .orderBy("date", "desc");

    const uniqueRawTeams = uniqueBy(rawTeams, "constructor_id");
    const previousRawTeams = uniqueRawTeams.slice(1); // Remove the current team
    const teams = convertMany(previousRawTeams, mapping.teams);
    return { data: teams };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getTeam,
  getTeams,
  getDriverCurrentTeam,
  getDriverPreviousTeams
};
