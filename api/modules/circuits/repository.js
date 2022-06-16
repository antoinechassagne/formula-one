const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getCircuit(id) {
  try {
    const where = convertBack({ id }, mapping.circuits);
    const rawCircuit = await database("circuits").where(where).first();
    const circuit = convert(rawCircuit, mapping.circuits);
    return { data: circuit };
  } catch (error) {
    return { error };
  }
}

async function getCircuits(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.circuits);
    const rawCircuits = await database("circuits")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const circuits = convertMany(rawCircuits, mapping.circuits);
    return { data: circuits };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getCircuit,
  getCircuits
};
