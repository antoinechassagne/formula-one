const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getSeason(id) {
  try {
    const where = serialize({ id });
    const rawSeason = await database("seasons").where(where).first();
    const season = deserialize(rawSeason);
    return { data: season };
  } catch (error) {
    return { error };
  }
}

async function getSeasons(skip = 0, limit = 100) {
  try {
    const rawSeasons = await database("seasons")
      .where()
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const seasons = deserializeMany(rawSeasons);
    return { data: seasons };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getSeason,
  getSeasons
};
