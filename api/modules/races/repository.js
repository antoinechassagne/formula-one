const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getRace(id) {
  try {
    const where = convertBack({ id }, mapping.races);
    const rawRace = await database("races").where(where).first();
    const race = convert(rawRace, mapping.races);
    return { data: race };
  } catch (error) {
    return { error };
  }
}

async function getRaces(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.races);
    const rawRaces = await database("races")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const races = convertMany(rawRaces, mapping.races);
    return { data: races };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getRace,
  getRaces
};
