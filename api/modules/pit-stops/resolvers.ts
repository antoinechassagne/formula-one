// @ts-nocheck
const { getPitStop, getPitStops } = require("./repository");
const { getRace } = require("../races/repository");
const { getDriver } = require("../drivers/repository");

async function pitStop(_, { id }) {
  const { data } = await getPitStop(id);
  return data || null;
}

async function pitStops(_, { query, skip, limit }) {
  const { data } = await getPitStops(query, skip, limit);
  return data || [];
}

async function race(pitStopPayload) {
  const { data } = await getRace(pitStopPayload.raceId);
  return data || null;
}

async function driver(pitStopPayload) {
  const { data } = await getDriver(pitStopPayload.driverId);
  return data || null;
}

module.exports = {
  Query: { pitStop, pitStops },
  PitStop: { race, driver }
};
