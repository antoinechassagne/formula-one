const database = require("../../database");
const { serialize, deserialize, deserializeMany } = require("../../services/Serialization");

async function getStatus(id) {
  try {
    const where = serialize({ id });
    const rawStatus = await database("statuses").where(where).first();
    const status = deserialize(rawStatus);
    return { data: status };
  } catch (error) {
    return { error };
  }
}

async function getStatuses(skip = 0, limit = 100) {
  try {
    const rawStatuses = await database("statuses")
      .where()
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const statuses = deserializeMany(rawStatuses);
    return { data: statuses };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getStatus,
  getStatuses
};
