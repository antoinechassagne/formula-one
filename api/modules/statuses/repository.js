const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getStatus(id) {
  try {
    const where = convertBack({ id }, mapping.statuses);
    const rawStatus = await database("status").where(where).first();
    const status = convert(rawStatus, mapping.statuses);
    return { data: status };
  } catch (error) {
    return { error };
  }
}

async function getStatuses(skip = 0, limit = 100) {
  try {
    const rawStatuses = await database("status")
      .where()
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const statuses = convertMany(rawStatuses, mapping.statuses);
    return { data: statuses };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getStatus,
  getStatuses
};
