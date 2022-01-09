const { getDriver, getDrivers } = require("./repository");
const { getDriverCurrentTeam } = require("../teams/repository");

async function driver(_, { id }) {
  const { data } = await getDriver(id);
  return data || null;
}

async function drivers(_, { query, skip, limit }) {
  const { data } = await getDrivers(query, skip, limit);
  return data || [];
}

async function currentTeam(driver) {
  const { data } = await getDriverCurrentTeam(driver.id);
  return data || null;
}

function previousTeams(driver) {
  /**
   * @todo: implement
   */
  return [];
}

module.exports = {
  Query: { driver, drivers },
  Driver: { currentTeam, previousTeams }
};
