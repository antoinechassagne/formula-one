module.exports = `
  type Query {
    sprintResult(id: ID!): SprintResult
    sprintResults(query: SprintResultsInput, skip: Int, limit: Int): [SprintResult]!
  }

  type SprintResult {
    id: ID!
    race: Race!
    driver: Driver!
    team: Team!
    number: Int!
    grid: Int!
    position: Int!
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

  input SprintResultsInput {
    raceId: ID
    driverId: ID
    teamId: ID
    statusId: ID
  }
`;
