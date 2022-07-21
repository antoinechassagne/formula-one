export default `
  type Query {
    circuit(id: ID!): Circuit
    circuits(query: CircuitsInput, skip: Int, limit: Int): [Circuit]!
  }

  type Circuit {
    id: ID!
    name: String!
    location: String!
    country: String!
    latitude: String!
    longitude: String!
    altitude: String!
    url: String!
  }

  input CircuitsInput {
    name: String
    location: String
    country: String
  }
`;
