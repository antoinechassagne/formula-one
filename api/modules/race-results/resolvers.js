const { getRaceResult, getRaceResults } = require("./repository");
const { getRace } = require("../races/repository");
const { getDriver } = require("../drivers/repository");
const { getTeam } = require("../teams/repository");
const { getStatus } = require("../statuses/repository");

async function raceResult(_, { id }) {
  const { data } = await getRaceResult(id);
  return data || null;
}

async function raceResults(_, { query, skip, limit }) {
  const { data } = await getRaceResults(query, skip, limit);
  return data || [];
}

async function race(raceResult) {
  const { data } = await getRace(raceResult.raceId);
  return data || null;
}

async function driver(raceResult) {
  const { data } = await getDriver(raceResult.driverId);
  return data || null;
}

async function team(raceResult) {
  const { data } = await getTeam(raceResult.teamId);
  return data || null;
}

async function status(raceResult) {
  const { data } = await getTeam(raceResult.statusId);
  return data || null;
}

module.exports = {
  Query: { raceResult, raceResults },
  RaceResult: { race, driver, team, status }
};
