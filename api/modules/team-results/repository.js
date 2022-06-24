const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getTeamResult(id) {
  try {
    const where = serialize({ id });
    const rawTeamResult = await database("team_results").where(where).first();
    const teamResult = deserialize(rawTeamResult);
    return { data: teamResult };
  } catch (error) {
    return { error };
  }
}

async function getTeamResults(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawTeamResults = await database("team_results")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const teamResults = deserializeMany(rawTeamResults);
    return { data: teamResults };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getTeamResult,
  getTeamResults
};
