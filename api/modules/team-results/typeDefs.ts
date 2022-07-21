module.exports = `
  type Query {
    teamResult(id: ID!): TeamResult
    teamResults(query: TeamResultsInput, skip: Int, limit: Int): [TeamResult]!
  }

  type TeamResult {
    id: ID!
    race: Race!
    team: Team!
    points: Int!
    disqualified: Boolean!
  }

  input TeamResultsInput {
    raceId: ID
    teamId: ID
    disqualified: Boolean
  }
`;
