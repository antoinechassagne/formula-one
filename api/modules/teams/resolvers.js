const { getTeam, getTeams } = require("./repository");

async function team(_, params) {
  const { data } = await getTeam({ id });
  return data || null;
}

async function teams(_, { query, skip, limit }) {
  const { data } = await getTeams(query, skip, limit);
  return data || [];
}

function currentDrivers(team) {
  /**
   * @todo: implement
   */
  return [];
}

function previousDrivers(team) {
  /**
   * @todo: implement
   */
  return [];
}

module.exports = {
  Query: { team, teams },
  Team: { currentDrivers, previousDrivers }
};
