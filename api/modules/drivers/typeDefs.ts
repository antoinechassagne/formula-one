module.exports = `
  type Query {
    driver(id: ID!): Driver
    drivers(query: DriversInput, skip: Int, limit: Int): [Driver]!
  }

  type Driver {
    id: ID!
    number: Int
    code: String
    firstName: String!
    lastName: String!
    birthdate: String!
    nationality: String!
    url: String!
    currentTeam: Team
    previousTeams: [Team]
  }

  input DriversInput {
    number: String
    code: String
    firstName: String
    lastName: String
    birthdate: String
  }
`;
