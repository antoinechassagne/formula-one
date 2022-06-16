const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getTeamResult(id) {
  try {
    const where = convertBack({ id }, mapping.teamResults);
    const rawTeamResult = await database("constructor_results")
      .where(where)
      .first();
    const teamResult = convert(rawTeamResult, mapping.teamResults);
    return { data: teamResult };
  } catch (error) {
    return { error };
  }
}

async function getTeamResults(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.teamResults);
    const rawTeamResults = await database("constructor_results")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const teamResults = convertMany(rawTeamResults, mapping.teamResults);
    return { data: teamResults };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getTeamResult,
  getTeamResults
};
