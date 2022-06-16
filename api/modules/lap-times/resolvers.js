const { getLapTime, getLapTimes } = require("./repository");
const { getRace } = require("../races/repository");
const { getDriver } = require("../drivers/repository");

async function lapTime(_, { id }) {
  const { data } = await getLapTime(id);
  return data || null;
}

async function lapTimes(_, { query, skip, limit }) {
  const { data } = await getLapTimes(query, skip, limit);
  return data || [];
}

async function race(lapTime) {
  const { data } = await getRace(lapTime.raceId);
  return data || null;
}

async function driver(lapTime) {
  const { data } = await getDriver(lapTime.driverId);
  return data || null;
}

module.exports = {
  Query: { lapTime, lapTimes },
  LapTime: { race, driver }
};
