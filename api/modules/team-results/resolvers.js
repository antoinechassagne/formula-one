const { getTeamResult, getTeamResults } = require("./repository");
const { getRace } = require("../races/repository");
const { getTeam } = require("../teams/repository");
const { getStatus } = require("../statuses/repository");

async function teamResult(_, { id }) {
  const { data } = await getTeamResult(id);
  return data || null;
}

async function teamResults(_, { query, skip, limit }) {
  const { data } = await getTeamResults(query, skip, limit);
  return data || [];
}

async function race(teamResult) {
  const { data } = await getRace(teamResult.raceId);
  return data || null;
}

async function team(teamResult) {
  const { data } = await getTeam(teamResult.teamId);
  return data || null;
}

async function status(teamResult) {
  const { data } = await getStatus(teamResult.statusId);
  return data || null;
}

module.exports = {
  Query: { teamResult, teamResults },
  TeamResult: { race, team, status }
};
