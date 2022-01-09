const { getTeam, getTeams } = require("./repository");
const {
  getTeamCurrentDrivers,
  getTeamPreviousDrivers
} = require("../drivers/repository");

async function team(_, { id }) {
  const { data } = await getTeam(id);
  return data || null;
}

async function teams(_, { query, skip, limit }) {
  const { data } = await getTeams(query, skip, limit);
  return data || [];
}

async function currentDrivers(team) {
  const { data } = await getTeamCurrentDrivers(team.id);
  return data || [];
}

async function previousDrivers(team) {
  const { data } = await getTeamPreviousDrivers(team.id);
  return data || [];
}

module.exports = {
  Query: { team, teams },
  Team: { currentDrivers, previousDrivers }
};
