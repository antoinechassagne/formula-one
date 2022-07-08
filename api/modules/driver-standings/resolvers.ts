// @ts-nocheck
const { DriverStanding, getDriverStandings } = require("./repository");
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

async function race(driverStandingPayload) {
  const { data } = await getRace(driverStandingPayload.raceId);
  return data || null;
}

async function driver(driverStandingPayload) {
  const { data } = await getDriver(driverStandingPayload.driverId);
  return data || null;
}

module.exports = {
  Query: { driverStanding, driverStandings },
  DriverStanding: { race, driver }
};
