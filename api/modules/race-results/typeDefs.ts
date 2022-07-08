module.exports = `
  type Query {
    raceResult(id: ID!): RaceResult
    raceResults(query: RaceResultsInput, skip: Int, limit: Int): [RaceResult]!
  }

  type RaceResult {
    id: ID!
    race: Race!
    driver: Driver!
    team: Team!
    number: Int!
    grid: Int!
    position: Int
    positionText: String!
    positionOrder: String!
    points: Int!
    laps: Int!
    time: String!
    milliseconds: String!
    fastestLap: Int!
    fastestLapTime: String!
    status: Status!
  }

  input RaceResultsInput {
    raceId: ID
    driverId: ID
    teamId: ID
    statusId: ID
  }
`;
