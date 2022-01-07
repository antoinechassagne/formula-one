const database = require("../../database");
const { convert, convertMany } = require("../../services/convertor");
const mapping = require("./mapping");

async function getDriver(query = {}) {
  try {
    const data = await database("drivers").where(query).first();
    return { data: convert(data, mapping) };
  } catch (error) {
    return { error };
  }
}

async function getDrivers(query = {}, skip = 0, limit = 100) {
  try {
    const data = await database("drivers")
      .where(query)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    return { data: convertMany(data, mapping) };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getDriver,
  getDrivers
};
