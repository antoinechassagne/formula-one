const db = require("../../db");

function team(_, params) {
  const { id } = params;
  const team = db.teams.find(team => team.id === id);
  return team;
}

function teams(_, { query, skip, limit }) {
  const teams = query
    ? db.teams.filter(team => {
        return !Object.keys(query).some(key => team[key] !== query[key]);
      })
    : db.teams;
  return teams.slice(skip, limit);
}

function createTeam(_, { data }) {
  const id = (db.teams.length + 1).toString();
  return { id, ...data };
}

function drivers(team) {
  return db.drivers.filter(driver => driver.teamId === team.id);
}

module.exports = {
  Query: { team, teams },
  Mutation: { createTeam },
  Team: { drivers }
};
