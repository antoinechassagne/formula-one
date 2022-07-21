module.exports = `
  type Query {
    season(id: ID!): Season
    seasons(skip: Int, limit: Int): [Season]!
  }

  type Season {
    id: ID!
    year: Int!
    url: String!
  }
`;
