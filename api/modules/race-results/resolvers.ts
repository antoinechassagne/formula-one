// @ts-nocheck
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

async function race(raceResultPayload) {
  const { data } = await getRace(raceResultPayload.raceId);
  return data || null;
}

async function driver(raceResultPayload) {
  const { data } = await getDriver(raceResultPayload.driverId);
  return data || null;
}

async function team(raceResultPayload) {
  const { data } = await getTeam(raceResultPayload.teamId);
  return data || null;
}

async function status(raceResultPayload) {
  const { data } = await getStatus(raceResultPayload.statusId);
  return data || null;
}

module.exports = {
  Query: { raceResult, raceResults },
  RaceResult: { race, driver, team, status }
};
