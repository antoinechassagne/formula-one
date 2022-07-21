module.exports = `
  type Query {
    race(id: ID!): Race
    races(query: RacesInput, skip: Int, limit: Int): [Race]!
  }

  type Race {
    id: ID!
    year: Int!
    round: Int!
    circuit: Circuit!
    name: String!
    date: String!
    time: String!
    url: String!
    fp1Date: String!
    fp1Time: String!
    fp2Date: String!
    fp2Time: String!
    fp3Date: String!
    fp3Time: String!
    qualifyingDate: String!
    qualifyingTime: String!
    sprintDate: String
    sprintTime: String
  }

  input RacesInput {
    year: Int
    circuitId: ID
  }
`;
