// @ts-nocheck
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

async function race(teamStandingPayload) {
  const { data } = await getRace(teamStandingPayload.raceId);
  return data || null;
}

async function team(teamStandingPayload) {
  const { data } = await getTeam(teamStandingPayload.teamId);
  return data || null;
}

module.exports = {
  Query: { teamStanding, teamStandings },
  TeamStanding: { race, team }
};
