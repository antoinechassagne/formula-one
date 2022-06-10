const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getSeason(id) {
  try {
    const where = convertBack({ id }, mapping.seasons);
    const rawSeason = await database("seasons").where(where).first();
    const season = convert(rawSeason, mapping.seasons);
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
    const seasons = convertMany(rawSeasons, mapping.seasons);
    return { data: seasons };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getSeason,
  getSeasons
};
