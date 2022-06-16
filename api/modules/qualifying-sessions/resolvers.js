const { getQualifyingSession, getQualifyingSessions } = require("./repository");
const { getRace } = require("../races/repository");
const { getDriver } = require("../drivers/repository");
const { getTeam } = require("../teams/repository");

async function qualifyingSession(_, { id }) {
  const { data } = await getQualifyingSession(id);
  return data || null;
}

async function qualifyingSessions(_, { query, skip, limit }) {
  const { data } = await getQualifyingSessions(query, skip, limit);
  return data || [];
}

async function race(qualifyingSession) {
  const { data } = await getRace(qualifyingSession.raceId);
  return data || null;
}

async function driver(qualifyingSession) {
  const { data } = await getDriver(qualifyingSession.driverId);
  return data || null;
}

async function team(qualifyingSession) {
  const { data } = await getTeam(qualifyingSession.teamId);
  return data || null;
}

module.exports = {
  Query: { qualifyingSession, qualifyingSessions },
  QualifyingSession: { race, driver, team }
};
