const { getRace, getRaces } = require("./repository");
const { getCircuit } = require("../circuits/repository");

async function race(_, { id }) {
  const { data } = await getRace(id);
  return data || null;
}

async function races(_, { query, skip, limit }) {
  const { data } = await getRaces(query, skip, limit);
  return data || [];
}

async function circuit(racePayload) {
  const { data } = await getCircuit(racePayload.circuitId);
  return data || null;
}

module.exports = {
  Query: { race, races },
  Race: { circuit }
};
