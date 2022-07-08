// @ts-nocheck
const { getSeason, getSeasons } = require("./repository");

async function season(_, { id }) {
  const { data } = await getSeason(id);
  return data || null;
}

async function seasons(_, { skip, limit }) {
  const { data } = await getSeasons(skip, limit);
  return data || [];
}

module.exports = {
  Query: { season, seasons }
};
