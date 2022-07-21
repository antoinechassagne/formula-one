// @ts-nocheck
const { getDriver, getDrivers } = require("./repository");
const { getDriverCurrentTeam, getDriverPreviousTeams } = require("../teams/repository");

async function driver(_, { id }) {
  const { data } = await getDriver(id);
  return data || null;
}

async function drivers(_, { query, skip, limit }) {
  const { data } = await getDrivers(query, skip, limit);
  return data || [];
}

async function currentTeam(driverPayload) {
  const { data } = await getDriverCurrentTeam(driverPayload.id);
  return data || null;
}

async function previousTeams(driverPayload) {
  const { data } = await getDriverPreviousTeams(driverPayload.id);
  return data || [];
}

module.exports = {
  Query: { driver, drivers },
  Driver: { currentTeam, previousTeams }
};
