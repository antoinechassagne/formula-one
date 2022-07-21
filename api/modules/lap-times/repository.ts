// @ts-nocheck
const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getLapTime(id) {
  try {
    const where = serialize({ id });
    const rawLapTime = await database("lap_times").where(where).first();
    const lapTime = deserialize(rawLapTime);
    return { data: lapTime };
  } catch (error) {
    return { error };
  }
}

async function getLapTimes(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawLapTimes = await database("lap_times")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const lapTimes = deserializeMany(rawLapTimes);
    return { data: lapTimes };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getLapTime,
  getLapTimes
};
