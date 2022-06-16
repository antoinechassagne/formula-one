const { getDriverStanding, getDriverStandings } = require("./repository");
const { getRace } = require("../races/repository");
const { getDriver } = require("../drivers/repository");

async function driverStanding(_, { id }) {
  const { data } = await getDriverStanding(id);
  return data || null;
}

async function driverStandings(_, { query, skip, limit }) {
  const { data } = await getDriverStandings(query, skip, limit);
  return data || [];
}

async function race(driverStanding) {
  const { data } = await getRace(driverStanding.raceId);
  return data || null;
}

async function driver(driverStanding) {
  const { data } = await getDriver(driverStanding.driverId);
  return data || null;
}

module.exports = {
  Query: { driverStanding, driverStandings },
  DriverStanding: { race, driver }
};
