const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getSprintResult(id) {
  try {
    const where = convertBack({ id }, mapping.sprintResults);
    const rawSprintResult = await database("sprint_results")
      .where(where)
      .first();
    const sprintResult = convert(rawSprintResult, mapping.sprintResults);
    return { data: sprintResult };
  } catch (error) {
    return { error };
  }
}

async function getSprintResults(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.sprintResults);
    const rawSprintResults = await database("sprint_results")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const sprintResults = convertMany(rawSprintResults, mapping.sprintResults);
    return { data: sprintResults };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getSprintResult,
  getSprintResults
};
