// @ts-nocheck
const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getDriverStanding(id) {
  try {
    const where = serialize({ id });
    const rawDriverStanding = await database("driver_standings").where(where).first();
    const driverStanding = deserialize(rawDriverStanding);
    return { data: driverStanding };
  } catch (error) {
    return { error };
  }
}

async function getDriverStandings(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawDriverStandings = await database("driver_standings")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const driverStandings = deserializeMany(rawDriverStandings);
    return { data: driverStandings };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getDriverStanding,
  getDriverStandings
};
