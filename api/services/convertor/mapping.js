module.exports = {
  drivers: {
    first_name: "firstName",
    last_name: "lastName"
  },
  races: {
    circuit_id: "circuitId",
    qualifiying_date: "qualifiyingDate",
    qualifiying_time: "qualifiyingTime"
  },
  constructorResults: {
    race_id: "raceId",
    constructor_id: "constructorId"
  },
  constructorStandings: {
    race_id: "raceId",
    constructor_id: "constructorId",
    position_text: "positionText"
  },
  driverStandings: {
    race_id: "raceId",
    driver_id: "driverId",
    position_text: "positionText"
  },
  lapTimes: {
    race_id: "raceId",
    driver_id: "driverId"
  },
  pitStops: {
    race_id: "raceId",
    driver_id: "driverId"
  },
  qualifying: {
    race_id: "raceId",
    driver_id: "driverId",
    constructor_id: "constructorId"
  },
  results: {
    race_id: "raceId",
    driver_id: "driverId",
    constructor_id: "constructorId",
    position_text: "positionText",
    position_order: "positionOrder",
    fastest_lap: "fastestLap",
    fastest_lap_time: "fastestLapTime",
    fastest_lap_speed: "fastestLapSpeed",
    status_id: "statusId"
  },
  sprint_results: {
    race_id: "raceId",
    driver_id: "driverId",
    constructor_id: "constructorId",
    position_text: "positionText",
    position_order: "positionOrder",
    fastest_lap: "fastestLap",
    fastest_lap_time: "fastestLapTime",
    status_id: "statusId"
  }
};
