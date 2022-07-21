module.exports = `
  type Query {
    team(id: ID!): Team
    teams(query: TeamsInput, skip: Int, limit: Int): [Team]!
  }

  type Team {
    id: ID!
    name: String!
    nationality: String!
    url: String!
    currentDrivers: [Driver]
    previousDrivers: [Driver]
  }

  input TeamsInput {
    name: String
    nationality: String
  }
`;
