const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getSprintResult(id) {
  try {
    const where = serialize({ id });
    const rawSprintResult = await database("sprint_results").where(where).first();
    const sprintResult = deserialize(rawSprintResult);
    return { data: sprintResult };
  } catch (error) {
    return { error };
  }
}

async function getSprintResults(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawSprintResults = await database("sprint_results")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const sprintResults = deserializeMany(rawSprintResults);
    return { data: sprintResults };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getSprintResult,
  getSprintResults
};
