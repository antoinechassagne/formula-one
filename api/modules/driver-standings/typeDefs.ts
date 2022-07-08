module.exports = `
  type Query {
    driverStanding(id: ID!): DriverStanding
    driverStandings(query: DriverStandingsInput, skip: Int, limit: Int): [DriverStanding]!
  }

  type DriverStanding {
    id: ID!
    race: Race!
    driver: Driver!
    points: Int
    position: Int!
    positionText: String!
    wins: Int!
  }

  input DriverStandingsInput {
    raceId: ID
    driverId: ID
  }
`;