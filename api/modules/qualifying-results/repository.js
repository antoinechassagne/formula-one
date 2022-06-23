const database = require("../../database");
const {
  serialize,
  deserialize,
  deserializeMany
} = require("../../services/Serialization");

async function getQualifyingResult(id) {
  try {
    const where = serialize({ id });
    const rawQualifyingResult = await database("qualifying_results")
      .where(where)
      .first();
    const qualifyResult = deserialize(rawQualifyingResult);
    return { data: qualifyResult };
  } catch (error) {
    return { error };
  }
}

async function getQualifyingResults(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawQualifyingResults = await database("qualifying_results")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const qualifyResults = deserializeMany(rawQualifyingResults);
    return { data: qualifyResults };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getQualifyingResult,
  getQualifyingResults
};
