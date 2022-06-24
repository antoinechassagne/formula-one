const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getRaceResult(id) {
  try {
    const where = serialize({ id });
    const rawRaceResult = await database("race_results").where(where).first();
    const raceResult = deserialize(rawRaceResult);
    return { data: raceResult };
  } catch (error) {
    return { error };
  }
}

async function getRaceResults(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawRaceResults = await database("race_results")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const raceResults = deserializeMany(rawRaceResults);
    return { data: raceResults };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getRaceResult,
  getRaceResults
};
