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

async function race(sprintResultPayload) {
  const { data } = await getRace(sprintResultPayload.raceId);
  return data || null;
}

async function driver(sprintResultPayload) {
  const { data } = await getDriver(sprintResultPayload.driverId);
  return data || null;
}

async function team(sprintResultPayload) {
  const { data } = await getTeam(sprintResultPayload.teamId);
  return data || null;
}

async function status(sprintResultPayload) {
  const { data } = await getStatus(sprintResultPayload.statusId);
  return data || null;
}

module.exports = {
  Query: { sprintResult, sprintResults },
  SprintResult: { race, driver, team, status }
};
