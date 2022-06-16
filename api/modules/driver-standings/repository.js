const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getDriverStanding(id) {
  try {
    const where = convertBack({ id }, mapping.driverStandings);
    const rawDriverStanding = await database("driver_standings")
      .where(where)
      .first();
    const driverStanding = convert(rawDriverStanding, mapping.driverStandings);
    return { data: driverStanding };
  } catch (error) {
    return { error };
  }
}

async function getDriverStandings(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.driverStandings);
    const rawDriverStandings = await database("driver_standings")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const driverStandings = convertMany(
      rawDriverStandings,
      mapping.driverStandings
    );
    return { data: driverStandings };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getDriverStanding,
  getDriverStandings
};
