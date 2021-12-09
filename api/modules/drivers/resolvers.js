const db = require("../../db");

function driver(_, params) {
  const { id } = params;
  const driver = db.drivers.find(driver => driver.id === id);
  return driver;
}

function drivers(_, { query, skip, limit }) {
  const drivers = query
    ? db.drivers.filter(driver => {
        return !Object.keys(query).some(key => driver[key] !== query[key]);
      })
    : db.drivers;
  return drivers.slice(skip, limit);
}

function createDriver(_, { data }) {
  const id = (db.drivers.length + 1).toString();
  return { id, ...data };
}

function team(driver) {
  return db.teams.find(team => team.id === driver.teamId);
}

module.exports = {
  Query: { driver, drivers },
  Mutation: { createDriver },
  Driver: { team }
};
