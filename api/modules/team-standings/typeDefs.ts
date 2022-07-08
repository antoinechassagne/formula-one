module.exports = `
  type Query {
    teamStanding(id: ID!): TeamStanding
    teamStandings(query: TeamStandingsInput, skip: Int, limit: Int): [TeamStanding]!
  }

  type TeamStanding {
    id: ID!
    race: Race!
    team: Team!
    points: Int
    position: Int!
    positionText: String!
    wins: Int!
  }

  input TeamStandingsInput {
    raceId: ID
    teamId: ID
  }
`;