// @ts-nocheck
module.exports = [
  {
    from: "circuits",
    to: "circuits",
    columns: [
      {
        from: "circuitId",
        to: "id"
      },
      {
        from: "circuitRef",
        to: "ref"
      },
      {
        from: "lat",
        to: "latitude"
      },
      {
        from: "lng",
        to: "longitude"
      },
      {
        from: "alt",
        to: "altitude"
      }
    ]
  },
  {
    from: "constructors",
    to: "teams",
    columns: [
      {
        from: "constructorId",
        to: "id"
      },
      {
        from: "constructorRef",
        to: "ref"
      }
    ]
  },
  {
    from: "drivers",
    to: "drivers",
    columns: [
      {
        from: "driverId",
        to: "id"
      },
      {
        from: "driverRef",
        to: "ref"
      },
      {
        from: "forename",
        to: "first_name"
      },
      {
        from: "surname",
        to: "last_name"
      },
      {
        from: "dob",
        to: "birthdate"
      }
    ]
  },
  {
    from: "seasons",
    to: "seasons",
    columns: []
  },
  {
    from: "status",
    to: "statuses",
    columns: [
      {
        from: "status",
        to: "id"
      },
      {
        from: "status",
        to: "label"
      }
    ]
  },
  {
    from: "races",
    to: "races",
    columns: [
      {
        from: "raceId",
        to: "id"
      },
      {
        from: "circuitId",
        to: "circuit_id"
      },
      {
        from: "quali_date",
        to: "qualifiying_date"
      },
      {
        from: "quali_time",
        to: "qualifiying_time"
      }
    ]
  },
  {
    from: "constructor_results",
    to: "team_results",
    columns: [
      {
        from: "constructorResultsId",
        to: "id"
      },
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "constructorId",
        to: "team_id"
      },
      {
        from: "status",
        to: "disqualified",
        with(value) {
          return value === "D";
        }
      }
    ]
  },
  {
    from: "constructor_standings",
    to: "team_standings",
    columns: [
      {
        from: "constructorStandingsId",
        to: "id"
      },
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "constructorId",
        to: "team_id"
      },
      {
        from: "positionText",
        to: "position_text"
      }
    ]
  },
  {
    from: "driver_standings",
    to: "driver_standings",
    columns: [
      {
        from: "driverStandingsId",
        to: "id"
      },
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "driverId",
        to: "driver_id"
      },
      {
        from: "positionText",
        to: "position_text"
      }
    ]
  },
  {
    from: "lap_times",
    to: "lap_times",
    columns: [
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "driverId",
        to: "driver_id"
      }
    ]
  },
  {
    from: "pit_stops",
    to: "pit_stops",
    columns: [
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "driverId",
        to: "driver_id"
      }
    ]
  },
  {
    from: "qualifying",
    to: "qualifying_results",
    columns: [
      {
        from: "qualifyId",
        to: "id"
      },
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "driverId",
        to: "driver_id"
      },
      {
        from: "constructorId",
        to: "team_id"
      }
    ]
  },
  {
    from: "results",
    to: "race_results",
    columns: [
      {
        from: "resultId",
        to: "id"
      },
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "driverId",
        to: "driver_id"
      },
      {
        from: "constructorId",
        to: "team_id"
      },
      {
        from: "positionText",
        to: "position_text"
      },
      {
        from: "positionOrder",
        to: "position_order"
      },
      {
        from: "fastestLap",
        to: "fastest_lap"
      },
      {
        from: "fastestLapTime",
        to: "fastest_lap_time"
      },
      {
        from: "fastestLapSpeed",
        to: "fastest_lap_speed"
      },
      {
        from: "statusId",
        to: "status_id"
      }
    ]
  },
  {
    from: "sprint_results",
    to: "sprint_results",
    columns: [
      {
        from: "resultId",
        to: "id"
      },
      {
        from: "raceId",
        to: "race_id"
      },
      {
        from: "driverId",
        to: "driver_id"
      },
      {
        from: "constructorId",
        to: "team_id"
      },
      {
        from: "positionText",
        to: "position_text"
      },
      {
        from: "positionOrder",
        to: "position_order"
      },
      {
        from: "fastestLap",
        to: "fastest_lap"
      },
      {
        from: "fastestLapTime",
        to: "fastest_lap_time"
      },
      {
        from: "statusId",
        to: "status_id"
      }
    ]
  }
];
