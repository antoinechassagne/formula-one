const db = require("../../db");

function team(_, params) {
  const { id } = params;
  const team = db.teams.find(team => team.id === id);
  return team;
}

function teams(_, { query, skip, limit }) {
  const teams = db.teams.filter(team => {
    return !Object.keys(query).some(key => team[key] !== query[key]);
  });
  return teams.slice(skip, limit);
}

function createTeam(_, { data }) {
  const id = (db.teams.length + 1).toString();
  return { id, ...data };
}

module.exports = { Query: { team, teams }, Mutation: { createTeam } };
