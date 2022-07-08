module.exports = `
  type Query {
    pitStop(id: ID!): PitStop
    pitStops(query: PitStopsInput, skip: Int, limit: Int): [PitStop]!
  }

  type PitStop {
    id: ID!
    race: Race!
    driver: Driver!
    stop: Int!
    lap: Int!
    time: String
    duration: String
    milliseconds: Int
  }

  input PitStopsInput {
    raceId: ID
    driverId: ID
  }
`;
