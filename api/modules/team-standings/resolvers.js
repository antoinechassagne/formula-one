const { getTeamStanding, getTeamStandings } = require("./repository");
const { getRace } = require("../races/repository");
const { getTeam } = require("../teams/repository");

async function teamStanding(_, { id }) {
  const { data } = await getTeamStanding(id);
  return data || null;
}

async function teamStandings(_, { query, skip, limit }) {
  const { data } = await getTeamStandings(query, skip, limit);
  return data || [];
}

async function race(teamStanding) {
  const { data } = await getRace(teamStanding.raceId);
  return data || null;
}

async function team(teamStanding) {
  const { data } = await getTeam(teamStanding.teamId);
  return data || null;
}

module.exports = {
  Query: { teamStanding, teamStandings },
  TeamStanding: { race, team }
};
