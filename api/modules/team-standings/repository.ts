// @ts-nocheck
const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getTeamStanding(id) {
  try {
    const where = serialize({ id });
    const rawTeamStanding = await database("team_standings").where(where).first();
    const teamStanding = deserialize(rawTeamStanding);
    return { data: teamStanding };
  } catch (error) {
    return { error };
  }
}

async function getTeamStandings(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawTeamStandings = await database("team_standings")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const teamStandings = deserializeMany(rawTeamStandings);
    return { data: teamStandings };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getTeamStanding,
  getTeamStandings
};
