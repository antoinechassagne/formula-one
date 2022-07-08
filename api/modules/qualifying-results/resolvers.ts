// @ts-nocheck
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

async function race(qualifyingResultPayload) {
  const { data } = await getRace(qualifyingResultPayload.raceId);
  return data || null;
}

async function driver(qualifyingResultPayload) {
  const { data } = await getDriver(qualifyingResultPayload.driverId);
  return data || null;
}

async function team(qualifyingResultPayload) {
  const { data } = await getTeam(qualifyingResultPayload.teamId);
  return data || null;
}

module.exports = {
  Query: { qualifyingResult, qualifyingResults },
  QualifyingResult: { race, driver, team }
};
