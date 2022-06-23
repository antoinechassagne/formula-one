const database = require("../../database");
const {
  serialize,
  deserialize,
  deserializeMany
} = require("../../services/Serialization");

async function getPitStop(id) {
  try {
    const where = serialize({ id });
    const rawPitStop = await database("pit_stops").where(where).first();
    const pitStop = deserialize(rawPitStop);
    return { data: pitStop };
  } catch (error) {
    return { error };
  }
}

async function getPitStops(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawPitStops = await database("pit_stops")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const pitStops = deserializeMany(rawPitStops);
    return { data: pitStops };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getPitStop,
  getPitStops
};
