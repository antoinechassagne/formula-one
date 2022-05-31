module.exports = {
  circuits: {
    circuitId: "id",
    circuitRef: "ref",
    lat: "latitude",
    lng: "longitude",
    alt: "altitude"
  },
  constructors: {
    constructorId: "id",
    constructorRef: "ref"
  },
  drivers: {
    driverId: "id",
    driverRef: "ref",
    forename: "first_name",
    surname: "last_name",
    dob: "birthdate"
  },
  seasons: {},
  status: {
    statusId: "id"
  },
  races: {
    raceId: "id",
    circuitId: "circuit_id",
    quali_date: "qualifiying_date",
    quali_time: "qualifiying_time"
  },
  constructor_results: {
    constructorResultsId: "id",
    raceId: "race_id",
    constructorId: "constructor_id"
  },
  constructor_standings: {
    constructorStandingsId: "id",
    raceId: "race_id",
    constructorId: "constructor_id",
    positionText: "position_text"
  },
  driver_standings: {
    driverStandingsId: "id",
    raceId: "race_id",
    driverId: "driver_id",
    positionText: "position_text"
  },
  lap_times: {
    raceId: "race_id",
    driverId: "driver_id"
  },
  pit_stops: {
    raceId: "race_id",
    driverId: "driver_id"
  },
  qualifying: {
    qualifyId: "id",
    raceId: "race_id",
    driverId: "driver_id",
    constructorId: "constructor_id"
  },
  results: {
    resultId: "id",
    raceId: "race_id",
    driverId: "driver_id",
    constructorId: "constructor_id",
    positionText: "position_text",
    positionOrder: "position_order",
    fastestLap: "fastest_lap",
    fastestLapTime: "fastest_lap_time",
    fastestLapSpeed: "fastest_lap_speed",
    statusId: "status_id"
  },
  sprint_results: {
    resultId: "id",
    raceId: "race_id",
    driverId: "driver_id",
    constructorId: "constructor_id",
    positionText: "position_text",
    positionOrder: "position_order",
    fastestLap: "fastest_lap",
    fastestLapTime: "fastest_lap_time",
    statusId: "status_id"
  }
};
