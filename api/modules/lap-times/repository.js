const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getLapTime(id) {
  try {
    const where = convertBack({ id }, mapping.lapTimes);
    const rawLapTime = await database("lap_times").where(where).first();
    const lapTime = convert(rawLapTime, mapping.lapTimes);
    return { data: lapTime };
  } catch (error) {
    return { error };
  }
}

async function getLapTimes(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.lapTimes);
    const rawLapTimes = await database("lap_times")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const lapTimes = convertMany(rawLapTimes, mapping.lapTimes);
    return { data: lapTimes };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getLapTime,
  getLapTimes
};
