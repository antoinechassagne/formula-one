const database = require("../../database");
const {
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");
const mapping = require("./mapping");

async function getDriver(id) {
  try {
    const where = convertBack({ id }, mapping);
    const rawDriver = await database("drivers").where(where).first();
    const driver = convert(rawDriver, mapping);
    return { data: driver };
  } catch (error) {
    return { error };
  }
}

async function getDrivers(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping);
    const rawDrivers = await database("drivers")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const drivers = convertMany(rawDrivers, mapping);
    return { data: drivers };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getDriver,
  getDrivers
};
