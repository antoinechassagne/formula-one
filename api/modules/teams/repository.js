const database = require("../../database");
const {
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");
const mapping = require("./mapping");

async function getTeam(id) {
  try {
    const where = convertBack({ id }, mapping);
    const rawTeam = await database("constructors").where(where).first();
    const team = convert(rawTeam, mapping);
    return { data: team };
  } catch (error) {
    return { error };
  }
}

async function getTeams(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping);
    const rawTeams = await database("constructors")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const teams = convertMany(rawTeams, mapping);
    return { data: teams };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getTeam,
  getTeams
};
