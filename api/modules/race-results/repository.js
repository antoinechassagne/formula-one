const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getRaceResult(id) {
  try {
    const where = convertBack({ id }, mapping.raceResults);
    const rawRaceResult = await database("results").where(where).first();
    const raceResult = convert(rawRaceResult, mapping.raceResults);
    return { data: raceResult };
  } catch (error) {
    return { error };
  }
}

async function getRaceResults(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.raceResults);
    const rawRaceResults = await database("results")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const raceResults = convertMany(rawRaceResults, mapping.raceResults);
    return { data: raceResults };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getRaceResult,
  getRaceResults
};
