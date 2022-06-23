const { getQualifyingResult, getQualifyingResults } = require("./repository");
const { getRace } = require("../races/repository");
const { getDriver } = require("../drivers/repository");
const { getTeam } = require("../teams/repository");

async function qualifyingResult(_, { id }) {
  const { data } = await getQualifyingResult(id);
  return data || null;
}

async function qualifyingResults(_, { query, skip, limit }) {
  const { data } = await getQualifyingResults(query, skip, limit);
  return data || [];
}

async function race(qualifyingResult) {
  const { data } = await getRace(qualifyingResult.raceId);
  return data || null;
}

async function driver(qualifyingResult) {
  const { data } = await getDriver(qualifyingResult.driverId);
  return data || null;
}

async function team(qualifyingResult) {
  const { data } = await getTeam(qualifyingResult.teamId);
  return data || null;
}

module.exports = {
  Query: { qualifyingResult, qualifyingResults },
  QualifyingResult: { race, driver, team }
};
