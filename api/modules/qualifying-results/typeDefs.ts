module.exports = `
  type Query {
    qualifyingResult(id: ID!): QualifyingResult
    qualifyingResults(query: QualifyingResultsInput, skip: Int, limit: Int): [QualifyingResult]!
  }

  type QualifyingResult {
    id: ID!
    race: Race!
    driver: Driver!
    team: Team!
    number: Int!
    position: Int!
    q1: String
    q2: String
    q3: String
  }

  input QualifyingResultsInput {
    raceId: ID
    driverId: ID
    teamId: ID
  }
`;
