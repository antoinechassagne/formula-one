const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getPitStop(id) {
  try {
    const where = convertBack({ id }, mapping.pitStops);
    const rawPitStop = await database("pit_stops").where(where).first();
    const pitStop = convert(rawPitStop, mapping.pitStops);
    return { data: pitStop };
  } catch (error) {
    return { error };
  }
}

async function getPitStops(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.pitStops);
    const rawPitStops = await database("pit_stops")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const pitStops = convertMany(rawPitStops, mapping.pitStops);
    return { data: pitStops };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getPitStop,
  getPitStops
};
