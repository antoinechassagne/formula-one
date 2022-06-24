const { getTeamResult, getTeamResults } = require("./repository");
const { getRace } = require("../races/repository");
const { getTeam } = require("../teams/repository");

async function teamResult(_, { id }) {
  const { data } = await getTeamResult(id);
  return data || null;
}

async function teamResults(_, { query, skip, limit }) {
  const { data } = await getTeamResults(query, skip, limit);
  return data || [];
}

async function race(teamResultPayload) {
  const { data } = await getRace(teamResultPayload.raceId);
  return data || null;
}

async function team(teamResultPayload) {
  const { data } = await getTeam(teamResultPayload.teamId);
  return data || null;
}

module.exports = {
  Query: { teamResult, teamResults },
  TeamResult: { race, team }
};
