const { getDriver, getDrivers } = require("./repository");
const {
  getDriverCurrentTeam,
  getDriverPreviousTeams
} = require("../teams/repository");

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

async function previousTeams(driver) {
  const { data } = await getDriverPreviousTeams(driver.id);
  return data || [];
}

module.exports = {
  Query: { driver, drivers },
  Driver: { currentTeam, previousTeams }
};
