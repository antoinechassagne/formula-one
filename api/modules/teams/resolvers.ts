// @ts-nocheck
const { Team, getTeams } = require("./repository");
const { getTeamCurrentDrivers, getTeamPreviousDrivers } = require("../drivers/repository");

async function team(_, { id }) {
  const { data } = await getTeam(id);
  return data || null;
}

async function teams(_, { query, skip, limit }) {
  const { data } = await getTeams(query, skip, limit);
  return data || [];
}

async function currentDrivers(teamPayload) {
  const { data } = await getTeamCurrentDrivers(teamPayload.id);
  return data || [];
}

async function previousDrivers(teamPayload) {
  const { data } = await getTeamPreviousDrivers(teamPayload.id);
  return data || [];
}

module.exports = {
  Query: { team, teams },
  Team: { currentDrivers, previousDrivers }
};
