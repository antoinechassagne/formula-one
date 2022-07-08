// @ts-nocheck
const { getCircuit, getCircuits } = require("./repository");

async function circuit(_, { id }) {
  const { data } = await getCircuit(id);
  return data || null;
}

async function circuits(_, { query, skip, limit }) {
  const { data } = await getCircuits(query, skip, limit);
  return data || [];
}

module.exports = {
  Query: { circuit, circuits }
};
