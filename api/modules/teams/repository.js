const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");
const { uniqueBy } = require("../../services/Utils");

async function getTeam(id) {
  try {
    const where = serialize({ id });
    const rawTeam = await database("teams").where(where).first();
    const team = deserialize(rawTeam);
    return { data: team };
  } catch (error) {
    return { error };
  }
}

async function getTeams(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawTeams = await database("teams")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const teams = deserializeMany(rawTeams);
    return { data: teams };
  } catch (error) {
    return { error };
  }
}

async function getDriverCurrentTeam(driverId) {
  try {
    const rawTeam = await database("race_results")
      .join("races", { "race_results.race_id": "races.id" })
      .join("drivers", { "race_results.driver_id": "drivers.id" })
      .join("teams", {
        "race_results.team_id": "teams.id"
      })
      .where({ "race_results.driver_id": driverId })
      .orderBy("date", "desc")
      .first();
    const team = deserialize(rawTeam);
    return { data: team };
  } catch (error) {
    return { error };
  }
}

async function getDriverPreviousTeams(driverId) {
  try {
    const rawTeams = await database("race_results")
      .join("races", { "race_results.race_id": "races.id" })
      .join("drivers", { "race_results.driver_id": "drivers.id" })
      .join("teams", {
        "race_results.team_id": "teams.id"
      })
      .where({ "race_results.driver_id": driverId })
      .orderBy("date", "desc");

    const uniqueRawTeams = uniqueBy(rawTeams, "team_id");
    const previousRawTeams = uniqueRawTeams.slice(1); // Remove the current team
    const teams = deserializeMany(previousRawTeams);
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
