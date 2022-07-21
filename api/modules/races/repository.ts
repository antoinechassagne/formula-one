// @ts-nocheck
const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getRace(id) {
  try {
    const where = serialize({ id });
    const rawRace = await database("races").where(where).first();
    const race = deserialize(rawRace);
    return { data: race };
  } catch (error) {
    return { error };
  }
}

async function getRaces(query = {}, skip = 0, limit = 100) {
  try {
    const where = serialize(query);
    const rawRaces = await database("races")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const races = deserializeMany(rawRaces);
    return { data: races };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getRace,
  getRaces
};
