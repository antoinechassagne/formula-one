const { getSprintResult, getSprintResults } = require("./repository");
const { getRace } = require("../races/repository");
const { getDriver } = require("../drivers/repository");
const { getTeam } = require("../teams/repository");
const { getStatus } = require("../statuses/repository");

async function sprintResult(_, { id }) {
  const { data } = await getSprintResult(id);
  return data || null;
}

async function sprintResults(_, { query, skip, limit }) {
  const { data } = await getSprintResults(query, skip, limit);
  return data || [];
}

async function race(sprintResult) {
  const { data } = await getRace(sprintResult.raceId);
  return data || null;
}

async function driver(sprintResult) {
  const { data } = await getDriver(sprintResult.driverId);
  return data || null;
}

async function team(sprintResult) {
  const { data } = await getTeam(sprintResult.teamId);
  return data || null;
}

async function status(sprintResult) {
  const { data } = await getStatus(sprintResult.statusId);
  return data || null;
}

module.exports = {
  Query: { sprintResult, sprintResults },
  SprintResult: { race, driver, team, status }
};
