const { getDriver, getDrivers } = require("./repository");

async function driver(_, { id }) {
  const { data } = await getDriver({ id });
  return data || null;
}

async function drivers(_, { query, skip, limit }) {
  const { data } = await getDrivers(query, skip, limit);
  return data || [];
}

function currentTeam(driver) {
  /**
   * @todo: implement
   */
  return null;
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
