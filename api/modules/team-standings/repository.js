const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getTeamStanding(id) {
  try {
    const where = convertBack({ id }, mapping.teamStandings);
    const rawTeamStanding = await database("constructor_standings")
      .where(where)
      .first();
    const teamStanding = convert(rawTeamStanding, mapping.teamStandings);
    return { data: teamStanding };
  } catch (error) {
    return { error };
  }
}

async function getTeamStandings(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.teamStandings);
    const rawTeamStandings = await database("constructor_standings")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const teamStandings = convertMany(rawTeamStandings, mapping.teamStandings);
    return { data: teamStandings };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getTeamStanding,
  getTeamStandings
};
